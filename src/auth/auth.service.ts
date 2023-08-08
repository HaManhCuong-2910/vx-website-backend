import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDto } from './dto/userLogin.dto';
import { AuthRepository } from './repository/auth.repository';
import { Request } from 'express';
import { filterAccount, saltOrRounds } from 'src/common/common';
import { AuthCreateDto } from './dto/authCreate.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async login(payload: UserLoginDto) {
    const { username, password } = UserLoginDto.plainToClass(payload);
    const resultLogin = await this.authRepository.validateUser(
      username,
      password,
    );
    if (resultLogin) {
      const access_token = this.authRepository.generate_access_token(
        filterAccount(resultLogin),
      );
      return {
        status: HttpStatus.OK,
        access_token,
        user: resultLogin,
      };
    }
    throw new UnauthorizedException();
  }

  async register(payload: AuthCreateDto) {
    const dataUser = AuthCreateDto.plainToClass(payload);
    const { password, username } = dataUser;
    const validateExistAccount = await this.authRepository.findByCondition({
      username,
    });

    if (validateExistAccount) {
      throw new HttpException('Đã tồn tại username', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    return await this.authRepository
      .create({ username, password: hashPassword })
      .then((newUser) => {
        return {
          status: HttpStatus.OK,
          data: newUser,
        };
      })
      .catch((error) => {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: error,
        };
      });
  }
}
