import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';
import { EmployeeModule } from './employee/employee.module';
import { LeaveModule } from './leave/leave.module';

@Module({
  imports: [UsersModule, AuthModule, DoctorsModule,EmployeeModule,LeaveModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class DomainModule {}
