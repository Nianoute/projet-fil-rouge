import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User } from 'src/decorator/decorator.controller';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  create(@Body() data: CreatePostDto, @User() user, @UploadedFiles() file) {
    return this.postService.create(data, user, file);
  }

  @Get()
  findAll(@Query() queries) {
    return this.postService.findAll(queries);
  }

  @Get('user/:id')
  findAllByUser(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findAllByUser(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('file'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @User() user,
    @UploadedFiles() file
  ) {
    return this.postService.update(id, updatePostDto, user, file);
  }

  @Delete(':id')
  softDelete(@Param('id', ParseIntPipe) id: number, @User() user) {
    return this.postService.softDelete(id, user);
  }
}
