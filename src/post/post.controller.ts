import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';


@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  create(
    @Body() data: CreatePostDto,
    @UploadedFiles() file
    ) {
    return this.postService.create(data, file);
  }

  @Get()
  findAll(
    @Query() queries
  ) {
    return this.postService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number,) {
    return this.postService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.postService.softDelete(id);
  }
}
