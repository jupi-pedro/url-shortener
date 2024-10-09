import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class UrlShortenerService {
  private urlMap: Record<
    string,
    { originalUrl: string; accessCount: number; title: string }
  > = {};
  private reverseUrlMap: Record<string, string> = {};
  private idCounter = 1;

  private readonly charts =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

  generateShortCode(id: number): string {
    let shortCode = '';
    while (id > 0) {
      shortCode = this.charts[id % 62] + shortCode;
      id = Math.floor(id / 62);
    }

    return shortCode;
  }
  async shortenUrl(originalUrl: string): Promise<string> {
    if (this.reverseUrlMap[originalUrl]) {
      return this.reverseUrlMap[originalUrl];
    }

    const shortCode = this.generateShortCode(this.idCounter++);
    const title = await this.getUrlTitle(originalUrl);

    this.urlMap[shortCode] = { originalUrl, accessCount: 0, title };
    this.reverseUrlMap[originalUrl] = shortCode;

    return shortCode;
  }

  getOriginalUrl(shortCode: string): string | undefined {
    const urlEntity = this.urlMap[shortCode];
    if (urlEntity) {
      return urlEntity.originalUrl;
    }
    return undefined;
  }

  async getUrlTitle(url: string): Promise<string> {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      return $('title').text() || 'No title';
    } catch (error) {
      return 'Unknown title';
    }
  }

  getTopUrls() {
    return Object.entries(this.urlMap)
      .sort(([, a], [, b]) => b.accessCount - a.accessCount)
      .slice(0, 100)
      .map(([shortCode, { originalUrl, title, accessCount }]) => ({
        shortCode,
        originalUrl,
        title,
        accessCount,
      }));
  }
}
