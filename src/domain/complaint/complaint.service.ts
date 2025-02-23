import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateComplainDto } from './dto/create-complaint.dto';
import { UpdateComplainDto } from './dto/update-complaint.dto';
import { Complain } from './entities/complaint.entity';

@Injectable()
export class ComplainService {
  constructor(
    @InjectRepository(Complain)
    private readonly complainRepository: Repository<Complain>,
  ) {}

  async create(createComplainDto: CreateComplainDto): Promise<Complain> {
    const complain = this.complainRepository.create(createComplainDto);
    return await this.complainRepository.save(complain);
  }

  async findAll(): Promise<Complain[]> {
    return await this.complainRepository.find();
  }

  async findOne(id: number): Promise<Complain> {
    const complain = await this.complainRepository.findOne({ where: { id } });
    if (!complain) {
      throw new NotFoundException('Complain not found');
    }
    return complain;
  }

  async update(id: number, updateComplainDto: UpdateComplainDto): Promise<Complain> {
    await this.complainRepository.update(id, updateComplainDto);
    const updatedComplain = await this.findOne(id);
    return updatedComplain;
  }

  async delete(id: number): Promise<{ message: string }> {
    const result = await this.complainRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Complain not found');
    }
    return { message: 'Complain deleted successfully' };
  }
}
