import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorEntity } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';


@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
  ) {}

  // Create a new doctor
  async create(createDoctorDto: CreateDoctorDto): Promise<DoctorEntity> {
    const doctor = this.doctorRepository.create(createDoctorDto);
    return await this.doctorRepository.save(doctor);
  }

  // Get all doctors
  async findAll(): Promise<DoctorEntity[]> {
    return await this.doctorRepository.find();
  }

  // Get a doctor by ID
  async findOne(id: number): Promise<DoctorEntity> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }

  // Update a doctor
  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<DoctorEntity> {
    const doctor = await this.findOne(id);
    Object.assign(doctor, updateDoctorDto);
    return await this.doctorRepository.save(doctor);
  }
  
  // Delete a doctor
  async delete(id: number): Promise<{ message: string }> {
    const result = await this.doctorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Doctor not found');
    }
    return { message: 'Doctor deleted successfully' };
  }
}
