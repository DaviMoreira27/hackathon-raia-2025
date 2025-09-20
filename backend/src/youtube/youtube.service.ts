import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  TranscriptItem,
  YoutubeIntegrationRequest,
  YoutubeIntegrationResponse,
} from './youtube.types';
import proto from './proto/compiled';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YoutubeService {
  private ytKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly cfg: ConfigService,
  ) {
    this.ytKey = cfg.get<string>('YT_KEY') || '';
  }

  async getTranscript(
    videoId: string,
    isAsr = true,
    lang = 'pt',
    retryCount = 0,
  ): Promise<TranscriptItem[]> {
    const res = await this.callYT(videoId, isAsr, lang, retryCount).catch(
      () => {
        return null;
      },
    );

    if (!res) {
      return [];
    }

    const getTranscriptSections =
      this.getTranscriptItemsField(res)?.map((queueGroup) => {
        const group = queueGroup.transcriptSegmentRenderer;
        return {
          start: Number(group.startMs),
          end: Number(group.endMs),
          text: group.snippet.runs?.[0]?.text?.replace(/(\n|\\n)/gi, ' ') ?? '',
        };
      }) ?? [];

    return this.combineTranscripts(getTranscriptSections);
  }

  private async callYT(
    videoId: string,
    isAsr = true,
    lang = 'en',
    retryCount = 0,
  ): Promise<YoutubeIntegrationResponse> {
    const Initial = proto.apex.Initial;
    const initialPayload = {
      IS_ASR: isAsr ? 'asr' : null,
      LANGUAGE_INITIALS: lang,
    };
    const initialMessage = Initial.create(initialPayload);
    const buf = Initial.encode(initialMessage).finish();

    const Final = proto.apex.Final;
    const finalPayload = {
      VIDEO_ID: videoId,
      LANGUAGE_INITIALS: Buffer.from(buf).toString('base64'),
    };
    const finalMessage = Final.create(finalPayload);
    const buf2 = Final.encode(finalMessage).finish();

    const request: YoutubeIntegrationRequest = {
      context: {
        client: {
          clientName: 'WEB',
          clientVersion: '2.20240410.01.00',
          screenPixelDensity: 2,
          platform: 'DESKTOP',
          acceptHeader:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          originalUrl: `https://www.youtube.com/watch?v=${videoId}`,
        },
      },
      params: Buffer.from(buf2).toString('base64'),
      languageCode: lang,
    };

    try {
      const response$ = this.httpService.post<YoutubeIntegrationResponse>(
        `https://www.youtube.com/youtubei/v1/get_transcript?key=${this.ytKey}`,
        request,
      );
      const { data: response } = await firstValueFrom(response$);

      if (
        !response.actions[0]?.updateEngagementPanelAction.content
          .transcriptRenderer.content.transcriptSearchPanelRenderer.body
          .transcriptSegmentListRenderer.initialSegments &&
        retryCount < 3
      ) {
        if (retryCount === 0) {
          return this.callYT(videoId, false, 'pt', 1);
        } else if (retryCount === 1) {
          return this.callYT(videoId, false, 'pt-BR', 2);
        } else if (retryCount === 2) {
          return this.callYT(videoId, false, 'pt-PT', 3);
        } else if (retryCount === 3) {
          return this.callYT(videoId, false, 'en', 3);
        }
      }

      return response;
    } catch (error) {
      console.log(
        `VIDEO: ${videoId}`,
        isAsr,
        retryCount,
        error?.response?.status,
        error?.response?.data,
      );

      if (retryCount === 0) {
        return this.callYT(videoId, false, 'en', 1);
      } else if (retryCount === 1) {
        return this.callYT(videoId, false, 'en-US', 2);
      }

      throw new Error('Error fetching transcript');
    }
  }

  private combineTranscripts(transcripts: TranscriptItem[]): TranscriptItem[] {
    const result: TranscriptItem[] = [];
    const maxValue = 6;

    for (let i = 0; i < transcripts.length; i += maxValue) {
      const chunk = transcripts.slice(i, i + maxValue);

      result.push({
        text: chunk
          .map((t) => t.text)
          .join(' ')
          .trim(),
        start: transcripts[i].start,
        end: chunk[chunk.length - 1].end,
      });
    }

    return result;
  }

  private getTranscriptItemsField(res: YoutubeIntegrationResponse) {
    return res.actions[0]?.updateEngagementPanelAction.content
      .transcriptRenderer.content.transcriptSearchPanelRenderer.body
      .transcriptSegmentListRenderer.initialSegments;
  }
}
