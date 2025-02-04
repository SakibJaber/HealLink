import {
  IsString,
  IsInt,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsISO8601,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateLeaveDto {
  @IsString()
  @IsNotEmpty()
  employee: string;

  @Transform(({ value }) => (value ? Number(value) : null))
  @IsNumber()
  @IsNotEmpty()
  emp_id: number;

  @IsString()
  @IsNotEmpty()
  leave_type: string;

  @IsISO8601()
  @IsNotEmpty()
  date_from: string;

  @IsISO8601()
  @IsNotEmpty()
  date_to: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
