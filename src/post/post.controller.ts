import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';


@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() data: CreatePostDto) {
    return this.postService.create(data);
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

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.postService.softDelete(id);
  }
}
