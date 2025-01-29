import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    console.log('Hashed Password (Before Save):', hashedPassword);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  // async findByEmail(email: string): Promise<UserEntity> {
  //   return this.userRepository.findOne({
  //     where: { email },
  //     select: ['password', 'email', 'username', 'email_status'],
  //   });
  // }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOne(id);

    try {
      Object.assign(user, updateUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
