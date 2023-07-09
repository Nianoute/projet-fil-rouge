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
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { User } from 'src/decorator/decorator.controller';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  create(@Body() data: CreateLikeDto, @User() user) {
    return this.likeService.create(data, user);
  }

  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.likeService.findOne(id);
  }

  @Get('post/:postId')
  findAllByPostId(@Param('postId', ParseIntPipe) postId: number, @User() user) {
    return this.likeService.findAllByPostId(postId, user);
  }

  @Get('user/:postId')
  findOneLikePostByUserId(
    @Param('postId', ParseIntPipe) postId: number,
    @User() user,
  ) {
    return this.likeService.findOneLikePostByUserId(postId, user);
  }

  @Delete(':id')
  softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.likeService.softDelete(id);
  }
}
