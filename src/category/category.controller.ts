import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { User } from 'src/decorator/decorator.controller';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  create(@Body() data: CreateCategoryDto, @User() user, @UploadedFiles() file) {
    return this.categoryService.create(data, user, file);
  }

  @Get()
  findAll(
    @Query() queries
  ) {
    return this.categoryService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateCategoryDto, @User() user) {
    return this.categoryService.update(id, data, user);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @User() user) {
    return this.categoryService.softRemove(id, user);
  }
}
