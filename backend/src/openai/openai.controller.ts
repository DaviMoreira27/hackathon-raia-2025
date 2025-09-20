import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import {
  FactualMoment,
  OpenaiService,
  TranscriptSegment,
} from './openai.service';
import { YoutubeService } from 'src/youtube/youtube.service';

interface GetTranscriptBody {
  youtubeLink: string;
}

@Controller('openai')
export class OpenaiController {
  constructor(
    private readonly svc: OpenaiService,
    private readonly youtubeService: YoutubeService,
  ) {}

  @Get('ping')
  async ping() {
    return { ok: true, reply: await this.svc.ping() };
  }

  @Post('test/info')
  async testInfo(@Body() body: { facts: FactualMoment[] }) {
    // const facts: FactualMoment[] = [
    //   {
    //     t: 14400,
    //     t_hms: '04:00:00.000',
    //     span: [14400, 28349], // <--- CORRIGIDO: Agora é uma tupla de 2 números
    //     span_hms: ['04:00:00.000', '07:52:29.000'],
    //     quote:
    //       'não tem teto de gasto para financiamento da dívida pública ou seja isso é tirar o povo do orçamento',
    //     kind: 'categorical',
    //   },
    //   // ... (o restante dos objetos)
    // ];

    // Chame a função passando o array 'facts' como argumento
    const information = await this.svc.searchInfoContext(body.facts);
    console.log(information);

    // Exemplo de retorno, ajustado para o novo teste
    return { information };
  }

  // Recebe uma lista plana de segmentos (start,end,text)
  @Post('facts')
  async facts(
    @Body() body: { segments: TranscriptSegment[]; language?: 'pt' | 'en' },
  ) {
    const moments = await this.svc.findFactualMomentsFromTranscript(
      body.segments || [],
      body.language || 'pt',
    );
    return { moments };
  }

  // Recebe o formato Sections do YouTube
  @Post('facts/sections')
  async factsFromSections(@Body() { youtubeLink }: GetTranscriptBody) {
    if (!youtubeLink) {
      throw new BadRequestException(
        'youtubeLink is required in the request body.',
      );
    }
    // Regex para extrair o ID do vídeo do YouTube
    // Suporta formatos como:
    // https://www.youtube.com/watch?v=TOB80XGcf-Q
    // https://youtu.be/TOB80XGcf-Q
    // https://www.youtube.com/embed/TOB80XGcf-Q
    // e URLs com parâmetros adicionais
    const videoIdMatch = youtubeLink.match(
      /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/,
    );

    if (!videoIdMatch || !videoIdMatch[1]) {
      throw new BadRequestException('Invalid YouTube link provided.');
    }

    const videoId = videoIdMatch[1];

    try {
      const transcript = await this.youtubeService.getTranscript(videoId);
      console.log('TRANSCRIPT', transcript);
      const moments = await this.svc.findFactualMomentsFromSections(
        transcript,
        'pt',
      );
      return { moments };
    } catch (error) {
      console.error(
        `Error in getTranscriptHandler for video ${videoId}:`,
        error,
      );
      throw new InternalServerErrorException(
        'Failed to retrieve transcript. Please try again later.',
      );
    }
  }
}
