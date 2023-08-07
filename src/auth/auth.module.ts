import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repository/auth.repository';
import { jwtDefaultConfig } from 'src/config/jwt.config';
import { MongooseModule } from '@nestjs/mongoose';
import { accountSchema } from './models/account.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ...jwtDefaultConfig,
    MongooseModule.forFeature([
      {
        name: 'Account',
        schema: accountSchema,
      },
    ]),
    ConfigModule.forRoot(),
  ],
  providers: [AuthService, AuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
