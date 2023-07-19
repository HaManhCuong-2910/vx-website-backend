import { connectDataBase } from 'src/config/database.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { mailDefaultConfig } from 'src/config/mail.config';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from 'src/mail/mail.module';
import { NewsModule } from 'src/news/news.module';
export const importApp = [
  ...connectDataBase,
  ...mailDefaultConfig,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', '..', 'public'),
    serveRoot: '/public/',
  }),
  MailModule,
  ScheduleModule.forRoot(),
  NewsModule,
];
