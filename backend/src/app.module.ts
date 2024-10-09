import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlShortenerController } from './url/url-shortener.controller';
import { UrlShortenerService } from './url/url-shortener.service';

@Module({
  imports: [],
  controllers: [AppController, UrlShortenerController],
  providers: [AppService, UrlShortenerService],
})
export class AppModule {}
