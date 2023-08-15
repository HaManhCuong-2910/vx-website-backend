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
import { JwtService } from '@nestjs/jwt';
import { ProjectController } from './project.controller';
import { projectSchema } from './model/project.model';
import { ProjectService } from './project.service';
import { ProjectRepository } from './repository/project.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Project',
        schema: projectSchema,
      },
    ]),
    MulterModule.register({
      dest: join(__dirname, '..', '..', 'public/project'),
    }),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository, JwtService],
})
export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: 'project/list',
        method: RequestMethod.GET,
      })
      .forRoutes(ProjectController);
  }
}
