import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { User } from 'src/decorator/decorator.controller';
import { CreateCategoryLikeDto } from './dto/create-likeCategory.dto';
import { LikeCategoryService } from './likeCategory.service';

@Controller('likesCategory')
export class LikeCategoryController {
  constructor(private readonly LikeCategoryService: LikeCategoryService) { }

  @Post()
  create(@Body() data: CreateCategoryLikeDto, @User() user) {
    return this.LikeCategoryService.create(data, user);
  }

  @Get()
  findAll() {
    return this.LikeCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.LikeCategoryService.findOne(id);
  }

  @Get('category/:categoryId')
  findAllByCategoryId(@Param('categoryId', ParseIntPipe) categoryId: number, @User() user) {
    return this.LikeCategoryService.findAllByCategoryId(categoryId, user);
  }

  @Get('user/:categoryId')
  findOneLikeCategoryByUserId(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @User() user,
  ) {
    return this.LikeCategoryService.findOneLikeCategoryByUserId(categoryId, user);
  }

  @Delete(':id')
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.LikeCategoryService.softDelete(id);
  }
}
