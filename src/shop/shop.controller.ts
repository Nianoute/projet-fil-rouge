import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  create(@Body() data: CreateShopDto) {
    return this.shopService.create(data);
  }

  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number,) {
    return this.shopService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateShopDto) {
    return this.shopService.update(id, data);
  }

  @Delete(':id')
  softDelete(@Param('id', ParseIntPipe) id: number,) {
    return this.shopService.softDelete(id);
  }
}
