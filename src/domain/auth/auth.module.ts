import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { MailerService } from './mailer.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, MailerService],
})
export class AuthModule {}
