import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  IsISO8601,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  patient_name: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  doctor_name: string;

  @Transform(({ value }) => {
    // Handle YYYY-MM-DD format from HTML date input
    if (/\d{4}-\d{2}-\d{2}/.test(value)) {
      return value; // Already in ISO format
    }

    // Handle DD/MM/YYYY format
    if (/\d{2}\/\d{2}\/\d{4}/.test(value)) {
      const [day, month, year] = value.split('/');
      return `${year}-${month}-${day}`;
    }

    throw new Error('Date format must be DD/MM/YYYY or YYYY-MM-DD');
  })
  @IsISO8601()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(10, 15)
  phone: string;
}
