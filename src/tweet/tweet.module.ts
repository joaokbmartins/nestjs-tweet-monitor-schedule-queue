import { Tweet } from './entities/tweet.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { CacheModule, Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { TweetCounterService } from './tweet-counter/tweet-counter.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    CacheModule.register(),
    SequelizeModule.forFeature([Tweet]),
    BullModule.registerQueue({ name: 'emails' }),
  ],
  controllers: [TweetController],
  providers: [TweetService, TweetCounterService],
})
export class TweetModule {}
