import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { staffSchema } from './model/staff.model';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { StaffRepository } from './repository/staff.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Staff',
        schema: staffSchema,
      },
    ]),
    MulterModule.register({
      dest: join(__dirname, '..', '..', 'public/staffs'),
    }),
  ],
  controllers: [StaffController],
  providers: [StaffService, StaffRepository, JwtService],
})
export class StaffModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(StaffController);
  }
}
