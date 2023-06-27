import { Controller, Get, Post, Body, Patch, ParseIntPipe, Param, Delete, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PostVariantService } from './post-variant.service';
import { CreatePostVariantDto } from './dto/create-post-variant.dto';
import { UpdatePostVariantDto } from './dto/update-post-variant.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('post-variants')
export class PostVariantController {
  constructor(private readonly postVariantService: PostVariantService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  create(
    @Body() data: CreatePostVariantDto,
    @UploadedFiles() file
    ) {
    return this.postVariantService.create(data, file);
  }

  @Get()
  findAll() {
    return this.postVariantService.findAll();
  }

  @Get('post/:postId')
  findAllByPostId(@Param('postId', ParseIntPipe) postId: number) {
    return this.postVariantService.findAllByPostId(postId);
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
