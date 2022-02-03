import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';

import { AppService } from './app.service';
import { TweetModule } from './tweet/tweet.module';
import { AppController } from './app.controller';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: join(__dirname, 'database.sqlite'),
      autoLoadModels: true,
      synchronize: true,
    }),
    TweetModule,
    MailingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
