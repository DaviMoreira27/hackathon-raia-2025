// src/openai/openai.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface TranscriptItem {
  start: number;
  end: number;
  text: string;
}
export interface Sections {
  sectionCount: number;
  sections: Array<{
    section: number;
    from: number;
    to: number;
    transcripts: TranscriptItem[];
  }>;
}

export type TranscriptSegment = {
  start: number;
  end: number;
  text: string;
  speaker?: string;
  section?: number; // <- de qual seção veio (opcional)
};

export type FactualMoment = {
  // canônicos para lógica/seek
  t: number;                       // segundo inicial (inteiro, arredondado p/ baixo)
  span?: [number, number];         // [start_s, end_s]

  // friendly display
  t_hms: string;                   // "HH:MM:SS.mmm"
  span_hms?: [string, string];     // ["HH:MM:SS.mmm","HH:MM:SS.mmm"]

  // conteúdo
  quote: string;
  kind: 'quantitative' | 'event' | 'causal' | 'categorical' | 'other';
};

@Injectable()
export class OpenaiService {
  private readonly log = new Logger(OpenaiService.name);
  private clientPromise: Promise<any> | null = null;   // import dinâmico do SDK
  private readonly model: string;

  constructor(private readonly cfg: ConfigService) {
    this.model = cfg.get<string>('OPENAI_MODEL') || 'gpt-4o-mini';
  }

  /** formata segundos -> "HH:MM:SS.mmm" (troque para withMs=false se não quiser milissegundos) */
  private toHMS(totalSeconds: number, withMs = true): string {
    const s = Math.max(0, Number(totalSeconds) || 0);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    const base =
      `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    if (!withMs) return base;
    const ms = Math.round((s - Math.floor(s)) * 1000);
    return `${base}.${String(ms).padStart(3,'0')}`;
  }

  /** Converte o objeto Sections (YouTube) em uma lista linear de segments */
  private sectionsToSegments(data: Sections): TranscriptSegment[] {
    if (!data?.sections?.length) return [];
    const out: TranscriptSegment[] = [];
    for (const s of data.sections) {
      for (const t of s.transcripts || []) {
        out.push({
          start: Number(t.start || 0),
          end: Number(t.end ?? t.start ?? 0),
          text: String(t.text || ''),
          section: Number(s.section ?? 0),
        });
      }
    }
    // ordena/dedup leve
    out.sort((a, b) => a.start - b.start || a.end - b.end);
    return out;
  }

  /** Carrega cliente OpenAI via import dinâmico (ESM) */
  private getClient(): Promise<any> {
    if (!this.clientPromise) {
      this.clientPromise = (async () => {
        const mod: any = await import('openai');
        const OpenAI = mod.default;
        const apiKey = this.cfg.get<string>('OPENAI_API_KEY');
        if (!apiKey) throw new Error('OPENAI_API_KEY não definido no .env');
        return new OpenAI({ apiKey });
      })();
    }
    return this.clientPromise;
  }

  /** Teste rápido */
  async ping() {
    const client = await this.getClient();
    const r = await client.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: 'ping' }],
      temperature: 1,
    });
    return r.choices?.[0]?.message?.content ?? 'ok';
  }

  /** Extrai momentos com alegações factuais a partir do formato Sections do YouTube */
  async findFactualMomentsFromSections(
    data: Sections,
    language: 'pt' | 'en' = 'pt',
  ): Promise<FactualMoment[]> {
    const segments = this.sectionsToSegments(data);
    return this.findFactualMomentsFromTranscript(segments, language);
  }

  /** Extrai momentos com alegações factuais a partir do transcript segmentado */
  async findFactualMomentsFromTranscript(
    segments: TranscriptSegment[],
    language: 'pt' | 'en' = 'pt',
  ): Promise<FactualMoment[]> {
    const joined = segments
      .map(
        (s) =>
          `[${s.start.toFixed(1)}–${s.end.toFixed(1)}]` +
          `${s.section != null ? ` {sec:${s.section}}` : ''}` +
          `${s.speaker ? ` (${s.speaker})` : ''} ` +
          `${s.text}`,
      )
      .join('\n');

// 1) Regras do sistema — agora exigindo span sempre presente
const system =
  language === 'pt'
    ? `Você extrairá APENAS afirmações factuais verificáveis (ex.: números, datas, eventos objetivos, afirmações categóricas) de uma transcrição com timestamps.
- Ignore opiniões e juízos de valor.
- Aponte o segundo inicial (inteiro) quando possível.
- SEMPRE inclua "span": [start,end] em segundos (números). Se o fim não for claro, use end = start.
- Seja parcimonioso.`
    : `You will extract ONLY verifiable factual claims from a timestamped transcript.
- Ignore opinions/values.
- Provide the starting second (integer) when possible.
- ALWAYS include "span": [start,end] in seconds (numbers). If end is unclear, set end = start.
- Be parsimonious.`;

const jsonSchema = {
  name: 'FactualMoments',
  schema: {
    type: 'object',
    additionalProperties: false,
    properties: {
      moments: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          properties: {
            t: { type: 'number' },
            quote: { type: 'string' },
            kind: {
              type: 'string',
              enum: ['quantitative', 'event', 'causal', 'categorical', 'other'],
            },
            span: {
              type: 'array',
              items: { type: 'number' },
              minItems: 2,
              maxItems: 2,
            },
          },
          
          required: ['t', 'quote', 'kind', 'span'],
        },
      },
    },
    required: ['moments'],
  },
  strict: true,
} as const;


    const user =
      language === 'pt'
        ? `Devolva SOMENTE JSON conforme o schema.
Texto com timestamps:
${joined}`
        : `Return JSON only (schema enforced).
Transcript:
${joined}`;

    const client = await this.getClient();

    const completion = await client.chat.completions.create({
      model: this.model,
      temperature: 1,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      response_format: { type: 'json_schema', json_schema: jsonSchema as any },
    });

    const content = completion.choices?.[0]?.message?.content ?? '{}';
    let parsed: any = {};
    try {
      parsed = JSON.parse(content);
    } catch {
      this.log.warn('Falha ao parsear JSON; retornando lista vazia.');
      return [];
    }

    const moments: FactualMoment[] = Array.isArray(parsed?.moments)
    ? parsed.moments.map((m: any) => {
        // números canônicos
        const tNum   = Number(m.t ?? 0);
        const startS = Array.isArray(m.span) ? Number(m.span[0]) : tNum;
        const endS   = Array.isArray(m.span) ? Number(m.span[1]) : startS;

        const tInt   = Math.max(0, Math.floor(Number.isFinite(tNum) ? tNum : startS));

        // strings para exibição
        const t_hms = this.toHMS(startS, true);
        const span_hms: [string, string] = [this.toHMS(startS, true), this.toHMS(endS, true)];

        return {
            t: tInt,
            t_hms,
            span: [startS, endS],
            span_hms,
            quote: String(m.quote || '').slice(0, 400),
            kind: (['quantitative', 'event', 'causal', 'categorical', 'other'].includes(m.kind)
            ? m.kind
            : 'other') as FactualMoment['kind'],
        };
        })
    : [];

    return moments.sort((a, b) => a.t - b.t);
  }
}
