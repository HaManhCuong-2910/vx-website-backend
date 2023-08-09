import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailContactDto } from './dto/mailContact.dto';
import { MailApplyDto } from './dto/mailApply.dto';
import { Request } from 'express';
import { unlinkSync } from 'fs';
import { join } from 'path';
@Injectable()
export class MailService {
  defaultEmail = 'hamanhcuong.gaapnow@gmail.com';

  constructor(private mailerService: MailerService) {}

  async sendMailContact(body: MailContactDto) {
    //send mail contract
    try {
      await this.mailerService.sendMail({
        to: this.defaultEmail,
        subject: `Khách hàng liên hệ - Thương hiệu ${body.brandName}`,
        template: './contact', // `.hbs` extension is appended automatically
        context: {
          ...body,
        },
      });

      return {
        status: HttpStatus.OK,
        data: 'Gửi mail thành công',
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error,
      };
    }
  }

  private getUploadFolderPath() {
    return join(__dirname, '..', '..', 'public', 'files');
  }

  async sendMailApply(
    body: MailApplyDto,
    files: Array<Express.Multer.File>,
    req: Request,
  ) {
    //send mail apply
    try {
      const dest = `${this.getUploadFolderPath()}`;
      const domain = `${req.protocol}://${req.get('Host')}`;
      const attachFiles =
        files.length > 0
          ? files.map((item) => {
              return {
                filename: item.originalname,
                path: `${domain}/public/files/${item.originalname}`,
              };
            })
          : [];
      await this.mailerService.sendMail({
        to: this.defaultEmail,
        subject: `Ứng tuyển - ${body.fullName}`,
        template: './apply', // `.hbs` extension is appended automatically
        context: {
          ...body,
        },
        attachments: attachFiles,
      });
      if (attachFiles.length > 0) {
        attachFiles.map((image: any) => {
          unlinkSync(join(dest, image.filename));
        });
      }

      return {
        status: HttpStatus.OK,
        data: 'Gửi mail thành công',
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error,
      };
    }
  }
}
