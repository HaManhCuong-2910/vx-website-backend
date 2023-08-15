import { connectDataBase } from 'src/config/database.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { mailDefaultConfig } from 'src/config/mail.config';
import { ScheduleModule } from '@nestjs/schedule';
import { MailModule } from 'src/mail/mail.module';
import { NewsModule } from 'src/news/news.module';
import { AuthModule } from 'src/auth/auth.module';
import { jwtDefaultConfig } from 'src/config/jwt.config';
import { StaffModule } from 'src/staff/staff.module';
import { ProjectModule } from 'src/project/project.module';
export const importApp = [
  ...jwtDefaultConfig,
  ...connectDataBase,
  ...mailDefaultConfig,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', '..', 'public'),
    serveRoot: '/public/',
  }),
  MailModule,
  AuthModule,
  ScheduleModule.forRoot(),
  NewsModule,
  StaffModule,
  ProjectModule,
];
