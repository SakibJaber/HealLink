import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Render,
} from '@nestjs/common';
import { ComplainService } from './complaint.service';
import { CreateComplainDto } from './dto/create-complaint.dto';
import { UpdateComplainDto } from './dto/update-complaint.dto';

@Controller('complain')
export class ComplainController {
  constructor(private readonly complainService: ComplainService) {}

  @Post('')
  async create(@Body() createComplainDto: CreateComplainDto) {
    return await this.complainService.create(createComplainDto);
  }

  @Get()
  @Render('complain')
  async findAll() {
    return await this.complainService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.complainService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateComplainDto: UpdateComplainDto,
  ) {
    return await this.complainService.update(+id, updateComplainDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.complainService.delete(+id);
  }
}
