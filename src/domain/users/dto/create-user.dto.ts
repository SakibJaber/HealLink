import { IsString, IsEmail, IsBoolean, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 255)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 255)
  password: string;

  @IsString()
  @IsOptional()
  email_status?: string;

  @IsOptional()
  verification_token?: string;
}
    