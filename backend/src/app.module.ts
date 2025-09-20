import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeModule } from './youtube/youtube.module';
import { ServicesModule } from './services/services.module';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [YoutubeModule,ConfigModule.forRoot({ isGlobal: true }), OpenaiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
