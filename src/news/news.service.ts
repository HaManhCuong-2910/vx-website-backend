import { Injectable } from '@nestjs/common';
import { NewsRepository } from './repository/news.repository';
import { CreateNewsDto } from './dto/createNews.dto';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async createNews(body: CreateNewsDto, files: Array<Express.Multer.File>) {
    console.log('body', body);
    console.log('files', files);
    return {
      test: 'oke',
    };
  }

  async clearImageTrash() {}
}
