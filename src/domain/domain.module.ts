import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';

@Module({
  imports: [UsersModule, AuthModule, DoctorsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class DomainModule {}
