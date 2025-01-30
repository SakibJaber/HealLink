import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Render,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorEntity } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadFile } from 'src/utils/file-upload.utils';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorService: DoctorsService) {}

  // Create a new doctor
  @Post('add')
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createDoctorDto: CreateDoctorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('Uploaded file:', file); // Debugging
    if (file) {
      createDoctorDto.image = await uploadFile(file);
    }
    return await this.doctorService.create(createDoctorDto);
  }

  @Get('add')
  @Render('add_doctor')
  getsignup(@Res() res: Response) {}

  // Get all doctors
  @Get()
  @Render('doctors')
  async findAll(): Promise<DoctorEntity[]> {
    return await this.doctorService.findAll();
  }

  // Get a doctor by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<DoctorEntity> {
    return await this.doctorService.findOne(id);
  }

  // Update a doctor by ID
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() updateDoctorDto: UpdateDoctorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateDoctorDto.image = await uploadFile(file);
    }
    return await this.doctorService.update(id, updateDoctorDto);
  }


  // Delete a doctor by ID
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return await this.doctorService.delete(id);
  }
}
