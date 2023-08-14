import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class OptionalStaffDto extends BaseDto {
  @IsOptional()
  @IsString()
  limit: string;

  @IsOptional()
  @IsString()
  page: string;

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

export class DeleteStaffDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
