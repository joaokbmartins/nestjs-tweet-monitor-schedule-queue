import { InjectQueue } from '@nestjs/bull';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';

import { Tweet } from './../entities/tweet.entity';
// import { TweetService } from './../tweet.service';

@Injectable()
export class TweetCounterService {
  // private pageCounter: number = 0;
  // private tweetService: TweetService,

  private searchLimit: number = 10;

  constructor(
    @InjectModel(Tweet)
    private tweetModel: typeof Tweet,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectQueue('emails')
    private emailsQueue: Queue,
  ) {}

  @Interval(5000)
  async countTweets() {
    let offset: number = await this.cacheManager.get<number>('tweet-offset');
    offset = offset === undefined ? 0 : offset;
    console.log(`Procurando tweets... \nOffset: ${offset}`);

    const tweets: Tweet[] = await this.tweetModel.findAll({
      offset,
      limit: this.searchLimit,
    });

    console.log('Qtd tweet(s) encontrados: ', tweets.length);
    if (tweets.length === this.searchLimit) {
      this.cacheManager.set('tweet-offset', offset + this.searchLimit, {
        ttl: 1 * 60 * 10,
      });
      console.log(`Novos ${this.searchLimit} tweet(s) encontrado(s).`);
      this.emailsQueue.add({ tweets: tweets.map((t) => t.toJSON()) });
    }
  }
}
