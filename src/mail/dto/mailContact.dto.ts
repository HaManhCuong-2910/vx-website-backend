import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class MailContactDto {
  @IsNotEmpty()
  @IsString()
  brandName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  storyBrand: string;
}
