import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class OptionalStaffDto extends BaseDto {
  @IsOptional()
  @IsString()
  limit: number;

  @IsOptional()
  @IsString()
  page: number;

  @IsOptional()
  @IsString()
  fromDate: string;

  @IsOptional()
  @IsString()
  toDate: string;

  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  image: string;
}

export class UpdateStaffDto extends OptionalStaffDto {
  @IsNotEmpty()
  @IsString()
  _id: string;
}
