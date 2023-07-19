import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/send')
  async sendMail(@Body() body: any) {
    return await this.mailService.sendMail(body);
  }
}
