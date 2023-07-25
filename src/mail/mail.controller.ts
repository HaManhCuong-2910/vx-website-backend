import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { MailContactDto } from './dto/mailContact.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { storageConfigFile } from 'src/config/storage.config';
import { MailApplyDto } from './dto/mailApply.dto';
import { Request } from 'express';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/send')
  async sendMail(@Body() body: any) {
    return await this.mailService.sendMail(body);
  }

  @Post('/send-mail-contact')
  async sendMailContact(@Body() body: MailContactDto) {
    return await this.mailService.sendMailContact(body);
  }

  @Post('/send-mail-apply')
  @UseInterceptors(AnyFilesInterceptor(storageConfigFile))
  async sendMailApply(
    @Req() req: Request,
    @Body() body: MailApplyDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.mailService.sendMailApply(body, files, req);
  }
}
