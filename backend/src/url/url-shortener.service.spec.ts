import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortenerService } from './url-shortener.service';

describe('UrlShortenerService', () => {
  let service: UrlShortenerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UrlShortenerService],
    }).compile();

    service = module.get<UrlShortenerService>(UrlShortenerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate short code for URL', async () => {
    const shortCode = await service.shortenUrl('https://www.google.com');
    expect(shortCode).toBeDefined();
  });

  it('should return original URL when short code is accessed', async () => {
    const shortCode = await service.shortenUrl('https://www.google.com');
    const originalUrl = service.getOriginalUrl(shortCode);

    expect(originalUrl).toEqual('https://www.google.com');
  });
});
