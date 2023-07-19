import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
export const mailDefaultConfig = [
  ConfigModule.forRoot(),
  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: process.env.MAIL_SERVICE_USER,
        pass: process.env.MAIL_SERVICE_PASS,
      },
    },
    template: {
      dir: join(__dirname, '..', 'mail', 'templates'),
      adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
      options: {
        strict: true,
      },
    },
  }),
];
