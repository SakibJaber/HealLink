import { Module } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveEntity } from './entities/leave.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveEntity])],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
