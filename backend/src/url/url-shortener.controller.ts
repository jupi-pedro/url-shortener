import { Controller, Post, Body, Get, Redirect, Param } from '@nestjs/common';
import { UrlShortenerService } from './url-shortener.service';

@Controller('url')
export class UrlShortenerController {
  constructor(private readonly urlShortenerService: UrlShortenerService) {}

  @Post('shorten')
  async shortenUrl(@Body('url') url: string): Promise<{ shortUrl: string }> {
    const shortCode = await this.urlShortenerService.shortenUrl(url);

    return { shortUrl: `http://localhost:5000/url/${shortCode}` };
  }

  @Get(':shortCode')
  @Redirect()
  async redirectUrl(@Param('shortCode') shortCode: string) {
    const originalUrl = this.urlShortenerService.getOriginalUrl(shortCode);

    if (originalUrl) {
      return { url: originalUrl };
    } else {
      return { url: 'http://localhost:5000/url/not-found', statusCode: 404 };
    }
  }

  @Get('top-100/list')
  getTopUrls() {
    return this.urlShortenerService.getTopUrls();
  }
}
