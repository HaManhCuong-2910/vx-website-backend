import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { JwtService } from '@nestjs/jwt';
import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { EStatusAccount, filterAccount } from 'src/common/common';
import * as bcrypt from 'bcrypt';
import { Account } from '../models/account.model';

export class AuthRepository extends BaseRepository<Account> {
  constructor(
    @InjectModel('Account')
    private readonly AccountModel: Model<Account>,
    private jwtService: JwtService,
  ) {
    super(AccountModel);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findByCondition({ username });
    if (user) {
      const { status } = user;
      const isMatchPassword = await bcrypt.compare(pass, user.password);
      const isActiveAccount = status === EStatusAccount.ACTIVE;

      if (!isMatchPassword) {
        throw new HttpException(
          'Mật khẩu không chính xác',
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (!isActiveAccount) {
        throw new HttpException('Tài khoản bị khóa', HttpStatus.UNAUTHORIZED);
      }

      delete user.password;
      return user;
    }
    throw new HttpException('Tài khoản không tồn tại', HttpStatus.UNAUTHORIZED);
  }

  generate_access_token(user: any) {
    const access_token = this.jwtService.sign(user, {
      expiresIn: '1d',
    });

    return access_token;
  }
}
