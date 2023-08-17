import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { newSchema } from './model/news.model';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { NewsRepository } from './repository/news.repository';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { JwtService } from '@nestjs/jwt';

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
  providers: [NewsService, NewsRepository, JwtService],
  exports: [NewsService, NewsRepository],
})
export class NewsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/news/create', method: RequestMethod.POST },
        { path: '/news/update', method: RequestMethod.PUT },
        { path: '/news/:id/delete', method: RequestMethod.DELETE },
      );
  }
}
