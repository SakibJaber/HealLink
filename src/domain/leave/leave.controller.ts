import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Render,
  InternalServerErrorException,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  // @Get('')
  // @Render('leave')
  // leave() {
  //   // return { home: [] }; // Ensure 'employee' is always defined
  // }

  @Get('add')
  @Render('add_leave')
  addLeave() {
    // return { home: [] }; // Ensure 'employee' is always defined
  }

  @Post('add')
  create(@Body() createLeaveDto: CreateLeaveDto) {
    return this.leaveService.create(createLeaveDto);
  }

  @Get()
  @Render('leave')
  async findAll() {
    try {
      const leaves = await this.leaveService.findAll();
      return { leaves, leave: leaves };
    } catch (error) {
      throw new InternalServerErrorException('Error fetching leaves');
    }
  }

  @Get('')
  async findOne(@Param('id') id: string) {
    try {
      return await this.leaveService.findOne(+id);
    } catch (error) {
      throw new InternalServerErrorException('Error fetching leave details');
    }
  }

  @Get('edit/:id')
  @Render('edit_leave')
  async editLeave(@Param('id') id: string) {
    try {
      const leave = await this.leaveService.findOne(+id);
      if (!leave) {
        throw new InternalServerErrorException('Leave record not found');
      }
      return { leave }; // Pass leave data to EJS template
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error fetching leave details');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLeaveDto: UpdateLeaveDto,
  ) {
    try {
      const leave = await this.leaveService.update(+id, updateLeaveDto);
      if (!leave) {
        throw new InternalServerErrorException('Leave record not found');
      }
      return { success: true, message: 'Leave updated successfully', leave };
    } catch (error) {
      throw new InternalServerErrorException('Error fetching leave details');
    }
  }

  @Get('delete/:id')
  // @Render('edit_leave')
  async deleteLeave(@Param('id') id: string) {
    try {
      const leave = await this.leaveService.findOne(+id);
      if (!leave) {
        throw new InternalServerErrorException('Leave record not found');
      }
      return { leave }; // Pass leave data to EJS template
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error fetching leave details');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedLeave = await this.leaveService.remove(+id);  // Delete from the database
      if (!deletedLeave) {
        throw new InternalServerErrorException('Leave record not found');
      }
      return { success: true, message: 'Leave deleted successfully' };  // Send success message
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error deleting leave record');
    }
  }
}

