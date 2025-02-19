import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentEntity } from './entities/appointment.entity';


@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
  ) {}

  async create(createDto: CreateAppointmentDto): Promise<AppointmentEntity> {
    try {
      const newAppointment = this.appointmentRepository.create(createDto);
      return await this.appointmentRepository.save(newAppointment);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create appointment');
    }
  }

  async findAll(): Promise<AppointmentEntity[]> {
    return await this.appointmentRepository.find();
  }

  async findOne(id: number): Promise<AppointmentEntity> {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) throw new NotFoundException(`Appointment with ID ${id} not found`);
    return appointment;
  }

  async update(id: number, updateDto: UpdateAppointmentDto): Promise<AppointmentEntity> {
    const appointment = await this.findOne(id);
    Object.assign(appointment, updateDto);
    try {
      return await this.appointmentRepository.save(appointment);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update appointment');
    }
  }

  async delete(id: number): Promise<void> {
    const appointment = await this.findOne(id);
    try {
      await this.appointmentRepository.remove(appointment);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete appointment');
    }
  }
}
