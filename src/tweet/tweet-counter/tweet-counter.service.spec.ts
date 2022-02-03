import { Test, TestingModule } from '@nestjs/testing';
import { TweetCounterService } from './tweet-counter.service';

describe('TweetCounterService', () => {
  let service: TweetCounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetCounterService],
    }).compile();

    service = module.get<TweetCounterService>(TweetCounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
