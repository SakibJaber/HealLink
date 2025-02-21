import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Render,
  InternalServerErrorException,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('add')
  @Render('add_medicine')
  addStore() {}

  @Post('add')
  async create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Get()
  @Render('store')
  async findAll() {
    try {
      const stores = await this.storeService.findAll();
      return { stores, store: null }; // store = null to hide search results initially
    } catch (error) {
      throw new InternalServerErrorException('Error fetching appointments');
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.storeService.findOne(id);
  }

  @Get('edit/:id')
  @Render('edit_medicine')
  async editMed(@Param('id') id: string) {
    try {
      const medicine = await this.storeService.findOne(+id);
      if (!medicine) {
        throw new InternalServerErrorException('Medicine record not found');
      }
      return { medicine }; // Pass medicine data to EJS template
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error fetching medicine details');
    }
  }

  // Update medicine
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    try {
      const updatedMedicine = this.storeService.update(+id, updateStoreDto);
      if (!updatedMedicine) {
        throw new InternalServerErrorException('Medicine record not found');
      }
      return {
        success: true,
        message: 'Medicine updated successfully',
        medicine: updatedMedicine,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error updating medicine details');
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.storeService.remove(id);
  }
}
