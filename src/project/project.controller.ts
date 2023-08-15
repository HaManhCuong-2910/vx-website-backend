import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfigProject } from 'src/config/storage.config';
import { RequireProjectDto } from './dto/requireProject.dto';
import {
  QuerySearchProjectDto,
  UpdateProjectDto,
} from './dto/optionalProject.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image', storageConfigProject))
  async createStaff(
    @Body() body: RequireProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.projectService.createProject(body, file);
  }

  @Put('/update')
  @UseInterceptors(FileInterceptor('image', storageConfigProject))
  async updateProject(
    @Body() data: UpdateProjectDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.projectService.updateProject(data, file);
  }

  @Get('/list')
  async getList(@Query() query: QuerySearchProjectDto) {
    return this.projectService.getList(query);
  }

  @Get('/:id/detail')
  async getDetailProject(@Param('id') id: string) {
    return this.projectService.getDetailProject(id);
  }

  @Delete('/:id/delete')
  async deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
