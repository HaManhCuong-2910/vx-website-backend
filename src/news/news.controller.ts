import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  Put,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/createNews.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config/storage.config';
import { DeleteNewsDto, UpdateNewsDto } from './dto/updateNews.dto';

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

  @Get('/list')
  async getList(@Query() query: any) {
    return this.newsService.getList(query);
  }

  @Get('/list-filter')
  async getListFilter() {
    return this.newsService.getListFilter();
  }

  @Get('/:id/detail')
  async getDetailNews(@Param('id') id: string) {
    return this.newsService.getDetailNews(id);
  }

  @Put('/update')
  @UseInterceptors(AnyFilesInterceptor(storageConfig))
  async updateNews(
    @Body() data: UpdateNewsDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.newsService.updateNews(data, files);
  }

  @Post('/upload')
  @UseInterceptors(AnyFilesInterceptor(storageConfig))
  async uploadFileImages(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.newsService.uploadFileImages(files);
  }

  @Delete('/:id/delete')
  async deleteNews(@Param() params: DeleteNewsDto) {
    return this.newsService.deleteNews(params);
  }
}
