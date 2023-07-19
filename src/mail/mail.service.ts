import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(body: any) {
    //send mail
    await this.mailerService.sendMail({
      to: 'hamanhcuong.gaapnow@gmail.com',
      subject: 'Test mail handlebars',
      template: './request', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: 'Cường kum',
      },
    });

    return body;
  }
}
