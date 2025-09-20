import {
  Controller,
  Post,
  Body,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { YoutubeService } from './youtube.service';

interface GetTranscriptBody {
  youtubeLink: string;
}

@Controller('api')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Post('transcript') // A rota completa será /api/transcript
  async getTranscriptHandler(@Body() { youtubeLink }: GetTranscriptBody) {
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
      return { videoId, transcript };
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
