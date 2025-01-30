import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';
import * as moment from 'moment';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return moment(value, 'DD/MM/YYYY').toDate();
    }
    return value; 
  })
  @IsNotEmpty()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  // @IsNotEmpty()
  @IsOptional()
  department?: string;

  @IsString()
  @IsNotEmpty()
  biography: string;
}
