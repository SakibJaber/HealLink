import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  email_status?: string;

  @IsOptional()
  verification_token?: string;
}
