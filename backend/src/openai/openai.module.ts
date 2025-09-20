import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { ConfigModule } from '@nestjs/config';
import { YoutubeModule } from 'src/youtube/youtube.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), YoutubeModule],
  providers: [OpenaiService],
  controllers: [OpenaiController],
  exports: [OpenaiService],
})
export class OpenaiModule {}
