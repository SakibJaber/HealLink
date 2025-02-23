import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentEntity } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
  ) {}

  async create(departmentDto: CreateDepartmentDto): Promise<DepartmentEntity> {
    const department = this.departmentRepository.create(departmentDto);
    return await this.departmentRepository.save(department);
  }

  async findAll(): Promise<DepartmentEntity[]> {
    return await this.departmentRepository.find();
  }

  async findOne(id: number): Promise<DepartmentEntity> {
    const department = await this.departmentRepository.findOne({
      where: { id },
    });
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    return department;
  }

  async update(
    id: number,
    updateDto: UpdateDepartmentDto,
  ): Promise<DepartmentEntity> {
    await this.findOne(id); // Check if department exists
    await this.departmentRepository.update(id, updateDto);
    return this.findOne(id); // Return updated department
  }

  async delete(id: number): Promise<void> {
    const result = await this.departmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Department not found');
    }
  }
}
