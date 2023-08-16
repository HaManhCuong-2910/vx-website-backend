import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class RequireProjectDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  title_large: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  title_short: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  des_short: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  font_title_large: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  position_desktop: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  position_mobile: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  size_desktop: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  size_mobile: string;
}
