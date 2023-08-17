import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NewsService } from 'src/news/news.service';
@Injectable()
export class ScheduleService {
  constructor(private readonly newsService: NewsService) {}

  //   @Cron(CronExpression.EVERY_10_SECONDS)
  //   handleClearImages() {
  //     console.log('test');
  //   }
}
