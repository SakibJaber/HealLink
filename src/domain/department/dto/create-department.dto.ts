import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty({ message: 'Department name is required' })
  @MaxLength(255, { message: 'Department name cannot exceed 255 characters' })
  department_name: string;

  @IsString()
  @IsNotEmpty({ message: 'Department description is required' })
  department_desc: string;
}


