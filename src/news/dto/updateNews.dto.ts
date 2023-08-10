import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class OptionalNewsDto extends BaseDto {
  @IsOptional()
  limit: number;

  @IsOptional()
  @IsString()
  tag: string;

  @IsOptional()
  imgs: string[];

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  short_description: string;

  @IsOptional()
  isOutstanding: boolean;

  @IsOptional()
  @IsString()
  description: string;
}

export class UpdateNewsDto extends OptionalNewsDto {
  @IsNotEmpty()
  _id: string;
}

export class DeleteNewsDto extends BaseDto {
  @IsNotEmpty()
  id: string;
}
