import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Render,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('add')
  @Render('add_appointment')
  addAppointment() {}

  @Post('add')
  create(@Body() createDto: CreateAppointmentDto) {
    try {
      return this.appointmentService.create(createDto);
    } catch (error) {
      throw new BadRequestException('Failed to create appointment');
    }
  }

  @Get()
  @Render('appointment')
  async findAll() {
    try {
      const appointments = await this.appointmentService.findAll();
      return { appointments, appointment: null }; // appointment = null to hide search results initially
    } catch (error) {
      throw new InternalServerErrorException('Error fetching appointments');
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.findOne(id);
  }

  @Get('edit/:id')
  @Render('edit_appointment')
  async editAppointment(@Param('id') id: string) {
    try {
      const appointment = await this.appointmentService.findOne(+id);
      if (!appointment) {
        throw new InternalServerErrorException('Appointment record not found');
      }
      return { appointment }; // Pass appointment data to EJS template
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Error fetching appointment details',
      );
    }
  }
  

  // Update appointment
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateAppointmentDto) {
    try {
      const updatedAppointment = await this.appointmentService.update(+id, updateDto);
      if (!updatedAppointment) {
        throw new InternalServerErrorException('Appointment record not found');
      }
      return {
        success: true,
        message: 'Appointment updated successfully',
        appointment: updatedAppointment,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Error updating appointment details',
      );
    }
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.delete(id);
  }
}
