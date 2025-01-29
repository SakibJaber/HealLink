import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { MailerService } from './mailer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordReset } from './entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordReset]), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, MailerService],
})
export class AuthModule {}
