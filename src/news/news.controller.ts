import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/createNews.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/storage.config';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('/create')
  @UseInterceptors(AnyFilesInterceptor(storageConfig))
  async createNews(
    @Body() body: CreateNewsDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.newsService.createNews(body, files);
  }
}
