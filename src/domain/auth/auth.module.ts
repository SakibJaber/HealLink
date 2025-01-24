import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { MailerService } from './mailer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([UserEntity]), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, MailerService],
})
export class AuthModule {}
