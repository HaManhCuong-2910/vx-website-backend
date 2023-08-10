import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class CreateNewsDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  tag: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  short_description: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  description: string;

  @IsOptional()
  @Expose()
  isOutstanding: boolean;
}
