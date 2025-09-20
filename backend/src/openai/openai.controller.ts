import { Body, Controller, Get, Post } from '@nestjs/common';
import { OpenaiService, TranscriptSegment, Sections } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly svc: OpenaiService) {}

  @Get('ping')
  async ping() {
    return { ok: true, reply: await this.svc.ping() };
  }

  // Recebe uma lista plana de segmentos (start,end,text)
  @Post('facts')
  async facts(@Body() body: { segments: TranscriptSegment[]; language?: 'pt' | 'en' }) {
    const moments = await this.svc.findFactualMomentsFromTranscript(
      body.segments || [],
      body.language || 'pt',
    );
    return { moments };
  }

  // Recebe o formato Sections do YouTube
  @Post('facts/sections')
  async factsFromSections(@Body() body: { data: Sections; language?: 'pt' | 'en' }) {
    const moments = await this.svc.findFactualMomentsFromSections(
      body.data,
      body.language || 'pt',
    );
    return { moments };
  }
}
