import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Render,
  Res,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { EmployeeService } from './employee.service';
import {
  CreateEmployeeDto,
  SearchEmployeeDto,
} from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeEntity } from './entities/employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // @Get('')
  // @Render('employee')
  // employee() {
  //   return { employee: [] }; // Ensure 'employee' is always defined
  // }

  @Get('add')
  @Render('add_employee')
  getEmployee(@Res() res: Response) {
    // res.render('employee', { async: true });
  }

  @Post('add')
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      return await this.employeeService.create(createEmployeeDto);
    } catch (error) {
      throw new BadRequestException('Failed to create employee');
    }
  }

  @Get()
  @Render('employee')
  async findAll() {
    try {
      const employees = await this.employeeService.findAll();
      return { employees, employee: null }; // employee = null to hide search results initially
    } catch (error) {
      throw new InternalServerErrorException('Error fetching employees');
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.employeeService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error fetching employee');
    }
  }

  // @Get('edit')
  // @Render('edit_employee')
  // editEmployee(@Res() res: Response) {}


  // @Get('edit/:id')
  // @Render('edit_employee')
  // async editEmployee(@Param('id') id: string) {
  //   try {
  //     const employee = await this.employeeService.findOne(+id);
  //     if (!employee) {
  //       throw new NotFoundException('Employee record not found');
  //     }
  //     return { employee }; // Correct message
  //   } catch (error) {
  //     console.error(error);
  //     throw new InternalServerErrorException('Error fetching employee details');
  //   }
  // }

  // @Patch(':id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateEmployeeDto: UpdateEmployeeDto,
  // ) {
  //   try {
  //     const employee = await this.employeeService.update(id, updateEmployeeDto);
  //     return {
  //       success: true,
  //       message: 'Employee updated successfully',
  //       employee,
  //     };
  //   } catch (error) {
  //     console.error(error);
  //     throw new BadRequestException('Failed to update employee');
  //   }
  // }

  @Get('edit/:id')
@Render('edit_employee')
async editEmployee(@Param('id') id: string) {
  try {
    const employee = await this.employeeService.findOne(+id);
    if (!employee) {
      throw new InternalServerErrorException('Employee record not found');
    }
    return { employee }; // Pass employee data to EJS template
  } catch (error) {
    console.error(error);
    throw new InternalServerErrorException('Error fetching employee details');
  }
}

@Patch(':id')
async update(
  @Param('id') id: string,
  @Body() updateEmployeeDto: UpdateEmployeeDto,
) {
  try {
    const employee = await this.employeeService.update(+id, updateEmployeeDto);
    if (!employee) {
      throw new InternalServerErrorException('Employee record not found');
    }
    return { success: true, message: 'Employee updated successfully', employee };
  } catch (error) {
    throw new InternalServerErrorException('Error updating employee details');
  }
}


  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.employeeService.remove(id);
      return { message: `Employee with ID ${id} deleted successfully` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error deleting employee');
    }
  }

  @Post('search')
  @Render('employee')
  async searchEmployees(@Body('search') query: string) {
    console.log('Search Query:', query);

    let filteredEmployees = [];
    if (query) {
      filteredEmployees = await this.employeeService.search(query);
    }

    return { employees: null, employee: filteredEmployees }; // employees = null to hide the full list
    // return res.json(filteredEmployees); // Return JSON instead of rendering
  }
}
