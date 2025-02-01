import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeEntity } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeEntity> {
    try {
      const employee = this.employeeRepository.create(createEmployeeDto);
      return await this.employeeRepository.save(employee);
    } catch (error) {
      throw new InternalServerErrorException('Error creating employee');
    }
  }

  async findAll(): Promise<EmployeeEntity[]> {
    try {
      return await this.employeeRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching employees');
    }
  }

  async findOne(id: number): Promise<EmployeeEntity> {
    try {
      const employee = await this.employeeRepository.findOne({ where: { id } });
      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }
      return employee;
    } catch (error) {
      throw error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Error fetching employee');
    }
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeEntity> {
    try {
      const employee = await this.findOne(id); // Ensure employee exists
      const updatedEmployee = Object.assign(employee, updateEmployeeDto);
      return await this.employeeRepository.save(updatedEmployee);
    } catch (error) {
      throw new InternalServerErrorException('Error updating employee');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const employee = await this.findOne(id); // Ensure employee exists
      await this.employeeRepository.remove(employee);
    } catch (error) {
      throw new InternalServerErrorException('Error deleting employee');
    }
  }
  

  async search(query: string): Promise<EmployeeEntity[]> {
    try {
      console.log('Received Query:', query);

      const trimmedQuery = query.trim();

      // Check if the query is a valid number (for searching by ID)
      const isNumeric = !isNaN(Number(trimmedQuery));

      let result: EmployeeEntity[];

      if (isNumeric) {
        // Search by ID
        result = await this.employeeRepository.find({
          where: { id: Number(trimmedQuery) },
        });
      } else {
        // Search by Name
        result = await this.employeeRepository
          .createQueryBuilder('employee')
          .where('LOWER(employee.name) LIKE :query', {
            query: `%${trimmedQuery.toLowerCase()}%`,
          })
          .getMany();
      }

      console.log('Final Query Result:', result);
      return result;
    } catch (error) {
      console.error('Error during search:', error);
      throw new InternalServerErrorException('Error searching employees');
    }
  }
}
