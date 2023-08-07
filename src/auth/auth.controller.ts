import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCreateDto } from './dto/authCreate.dto';
import { UserLoginDto } from './dto/userLogin.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() payload: UserLoginDto) {
    return await this.authService.login(payload);
  }

  @Post('/register')
  async register(@Body() payload: AuthCreateDto) {
    return await this.authService.register(payload);
  }
}
