import { Controller, Get, Post, Body, Patch, ParseIntPipe, Param, Delete } from '@nestjs/common';
import { PostVariantService } from './post-variant.service';
import { CreatePostVariantDto } from './dto/create-post-variant.dto';
import { UpdatePostVariantDto } from './dto/update-post-variant.dto';

@Controller('post-variants')
export class PostVariantController {
  constructor(private readonly postVariantService: PostVariantService) {}

  @Post()
  create(@Body() data: CreatePostVariantDto) {
    return this.postVariantService.create(data);
  }

  @Get()
  findAll() {
    return this.postVariantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number,) {
    return this.postVariantService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePostVariantDto) {
    return this.postVariantService.update(id, data);
  }

  @Delete(':id')
  softDelete(@Param('id', ParseIntPipe) id: number,) {
    return this.postVariantService.softDelete(id);
  }
}
