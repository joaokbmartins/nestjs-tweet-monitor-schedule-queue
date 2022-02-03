import { Tweet } from './entities/tweet.entity';
import { Injectable } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TweetService {
  constructor(
    @InjectModel(Tweet)
    private tweetModel: typeof Tweet,
  ) {}

  countTweets() {
    return this.tweetModel.count();
  }

  create(createTweetDto: CreateTweetDto) {
    return this.tweetModel.create(createTweetDto as any);
  }

  findAll() {
    return this.tweetModel.findAll();
  }

  findOne(id: number) {
    return this.tweetModel.findByPk(id);
  }

  update(id: number, updateTweetDto: UpdateTweetDto) {
    // return this.tweetModel.update( ['id':id,value: updateTweetDto] );
    return null;
  }

  remove(id: number) {
    return `This action removes a #${id} tweet`;
  }
}
