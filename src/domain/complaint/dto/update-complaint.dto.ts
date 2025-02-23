import { PartialType } from '@nestjs/mapped-types';
import { CreateComplainDto, } from './create-complaint.dto';

export class UpdateComplainDto extends PartialType(CreateComplainDto) {}
