import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  Min,
  IsOptional,
  IsInt,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { isDate, parse } from 'date-fns';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
      return isDate(parsedDate) ? parsedDate : null;
    }
    return value;
  })
  purchase_date: Date;

  
  @IsString()
  @IsNotEmpty({ message: 'Expire status is required' })
  expire: string;

  @IsNotEmpty({ message: 'Expiration end date is required' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      const parsedDate = parse(value, 'dd/MM/yyyy', new Date());
      return isDate(parsedDate) ? parsedDate : null;
    }
    return value;
  })
  expire_end: Date;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({}, { message: 'price must be a number' })
  @Min(0, { message: 'Price must be a positive number' })
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt({ message: 'quantity must be an integer' })
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}
