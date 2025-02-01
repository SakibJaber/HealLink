import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { LeaveEntity } from './entities/leave.entity';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(LeaveEntity)
    private readonly leaveRepository: Repository<LeaveEntity>,
  ) {}

  async create(createLeaveDto: CreateLeaveDto): Promise<LeaveEntity> {
    const leave = this.leaveRepository.create(createLeaveDto);
    return this.leaveRepository.save(leave);
  }

  async findAll(): Promise<LeaveEntity[]> {
    return this.leaveRepository.find();
  }

  async findOne(id: number): Promise<LeaveEntity> {
    const leave = await this.leaveRepository.findOne({ where: { id } });
    if (!leave) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }
    return leave;
  }

  async update(id: number, updateLeaveDto: UpdateLeaveDto): Promise<LeaveEntity> {
    await this.leaveRepository.update(id, updateLeaveDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.leaveRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }
  }
}
