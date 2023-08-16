import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class OptionalProjectDto extends BaseDto {
  @IsOptional()
  @IsString()
  title_large: string;

  @IsOptional()
  @IsString()
  title_short: string;

  @IsOptional()
  @IsString()
  des_short: string;

  @IsOptional()
  @IsString()
  font_title_large: string;

  @IsOptional()
  @IsString()
  position_desktop: string;

  @IsOptional()
  @IsString()
  position_mobile: string;

  @IsOptional()
  @IsString()
  size_desktop: string | number;

  @IsOptional()
  @IsString()
  size_mobile: string | number;

  @IsOptional()
  @IsString()
  image: string;
}

export class UpdateProjectDto extends OptionalProjectDto {
  @IsNotEmpty()
  @IsString()
  _id: string;
}

export class QuerySearchProjectDto extends OptionalProjectDto {
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
}
