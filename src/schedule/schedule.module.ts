import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { NewsModule } from 'src/news/news.module';

@Module({
  imports: [NewsModule],
  controllers: [],
  providers: [ScheduleService],
})
export class ScheduleSetModule {}
