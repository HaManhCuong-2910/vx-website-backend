import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { newSchema } from './model/news.model';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { NewsRepository } from './repository/news.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'News',
        schema: newSchema,
      },
    ]),
    MulterModule.register({
      dest: join(__dirname, '..', '..', 'public/images'),
    }),
  ],
  controllers: [NewsController],
  providers: [NewsService, NewsRepository],
})
export class NewsModule {}
