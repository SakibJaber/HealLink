import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
  IsNumber,
  IsOptional,
  IsDate,
} from 'class-validator';


export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('BD')
  contact: string;

  // @Transform(({ value }) => {
  //   if (typeof value === 'string' && value.trim()) {
  //     const parsedDate = moment(value, ['YYYY-MM-DD', 'DD/MM/YYYY'], true);
  //     return parsedDate.isValid() ? parsedDate.toDate() : null;
  //   }
  //   return null;
  // })
  
  // @Transform(({ value }) => {
  //   if (typeof value === 'string' && value.trim()) {
  //     const parsedDate = moment(value, ['YYYY-MM-DD', 'DD/MM/YYYY'], true);
  //     return parsedDate.isValid() ? parsedDate.toDate() : null;
  //   }
  //   return null;
  // })
  @Transform(({ value }) => new Date(value)) // Convert string to Date object
  @IsDate({ message: 'join_date must be a valid ISO 8601 date string' })
  join_date: string;


  @IsString()
  role: string;

  @Transform(({ value }) => (value ? Number(value) : null))
  @IsNumber()
  @IsOptional()
  salary: number;
}

export class SearchEmployeeDto {
  query: string;
}
