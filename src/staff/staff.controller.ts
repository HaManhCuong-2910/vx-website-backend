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
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig, storageConfigStaff } from 'src/config/storage.config';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/createStaff.dto';
import { OptionalStaffDto, UpdateStaffDto } from './dto/optionStaff.dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image', storageConfigStaff))
  async createStaff(
    @Body() body: CreateStaffDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.staffService.createStaff(body, file);
  }

  @Put('/update')
  @UseInterceptors(FileInterceptor('image', storageConfigStaff))
  async updateStaff(
    @Body() data: UpdateStaffDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.staffService.updateStaff(data, file);
  }

  @Get('/list')
  async getList(@Query() query: OptionalStaffDto) {
    return this.staffService.getList(query);
  }

  @Get('/:id/detail')
  async getDetailStaff(@Param('id') id: string) {
    return this.staffService.getDetailStaff(id);
  }

  @Delete('/:id/delete')
  async deleteStaff(@Param('id') id: string) {
    return this.staffService.deleteStaff(id);
  }
}
