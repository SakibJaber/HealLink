import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoreEntity } from './entities/store.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
  ) {}

  async create(createStoreDto: CreateStoreDto): Promise<StoreEntity> {
    try {
      const store = this.storeRepository.create(createStoreDto);
      return await this.storeRepository.save(store);
    } catch (error) {
      throw new InternalServerErrorException('Error creating store record');
    }
  }

  async findAll(): Promise<StoreEntity[]> {
    try {
      return await this.storeRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving store records');
    }
  }

  async findOne(id: number): Promise<StoreEntity> {
    try {
      const store = await this.storeRepository.findOne({ where: { id } });
      if (!store) {
        throw new NotFoundException(`Store record with ID ${id} not found`);
      }
      return store;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching store details');
    }
  }

  async update(
    id: number,
    updateStoreDto: UpdateStoreDto,
  ): Promise<StoreEntity> {
    try {
      const existingStore = await this.findOne(id);
      const updatedStore = Object.assign(existingStore, updateStoreDto);
      return await this.storeRepository.save(updatedStore);
    } catch (error) {
      throw new InternalServerErrorException('Error updating store record');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const store = await this.findOne(id);
      await this.storeRepository.remove(store);
      return { message: 'Store record deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error deleting store record');
    }
  }
}
