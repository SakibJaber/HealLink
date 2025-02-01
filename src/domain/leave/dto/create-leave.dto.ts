import { IsString, IsInt, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLeaveDto {
  @IsString()
  @IsNotEmpty()
  employee: string;

  @IsInt()
  @IsNotEmpty()
  emp_id: number;

  @IsString()
  @IsNotEmpty()
  leave_type: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date_from: Date;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date_to: Date;

  @IsString()
  @IsNotEmpty()
  reason: string;
}
