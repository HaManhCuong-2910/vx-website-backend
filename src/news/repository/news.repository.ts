import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { ObjectId } from 'mongodb';
import { News } from '../model/news.model';

@Injectable()
export class NewsRepository extends BaseRepository<News> {
  constructor(
    @InjectModel('News')
    private readonly newsModel: Model<News>,
  ) {
    super(newsModel);
  }

  async countDocuments(filter) {
    return this.newsModel.countDocuments(filter);
  }

  async searchExitsTag() {
    return await this.newsModel.distinct('tag');
  }

  async getRandom(size: string) {
    return this.newsModel.aggregate([{ $sample: { size: Number(size) } }]);
  }

  async searchExitsImages() {
    return await this.newsModel.distinct('imgs');
  }
}
