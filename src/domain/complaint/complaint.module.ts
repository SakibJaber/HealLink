import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complain } from './entities/complaint.entity';
import { ComplainController } from './complaint.controller';
import { ComplainService } from './complaint.service';


@Module({
  imports: [TypeOrmModule.forFeature([Complain])],
  controllers: [ComplainController],
  providers: [ComplainService],
})
export class ComplainModule {}
