import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Render,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentEntity } from './entities/department.entity';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get('add')
  @Render('add_departments')
  addDepartments() {}

  @Post('add')
  async create(
    @Body() createDto: CreateDepartmentDto,
  ): Promise<DepartmentEntity> {
    try {
      return await this.departmentService.create(createDto);
    } catch (error) {
      throw new BadRequestException('Failed to create department');
    }
  }

  @Get()
  @Render('departments')
  async findAll() {
    try {
      const departments = await this.departmentService.findAll();
      return { departments }; // Passing the departments list to EJS
    } catch (error) {
      throw new InternalServerErrorException('Error fetching departments');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<DepartmentEntity> {
    return this.departmentService.findOne(id);
  }

  @Get('edit/:id')
  @Render('edit_department')
  async editDepartment(@Param('id') id: string) {
    try {
      const department = await this.departmentService.findOne(+id);
      if (!department) {
        throw new InternalServerErrorException('Department record not found');
      }
      return { department }; // Pass department data to EJS template
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Error fetching department details',
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDepartmentDto,
  ) {
    try {
      const updatedDepartment = await this.departmentService.update(
        +id,
        updateDto,
      );
      if (!updatedDepartment) {
        throw new InternalServerErrorException('Department record not found');
      }
      return {
        success: true,
        message: 'Department updated successfully',
        appointment: updatedDepartment,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Error updating department details',
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    await this.departmentService.delete(id);
    return { message: 'Department deleted successfully' };
  }
}
