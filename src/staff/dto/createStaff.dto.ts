import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from 'src/base/base.dto';

export class CreateStaffDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  position: string;
}
