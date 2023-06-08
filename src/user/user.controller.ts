import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    create(
      @Body() data: CreateUserDto,
      @UploadedFiles() files,
      ) {
      return this.userService.create(data);
    }
  
    @Get()
    findAll() {
      return this.userService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.userService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(+id, updateUserDto);
    }
  
    @Delete(':id')
    softDelete(@Param('id', ParseIntPipe) id: number) {
      return this.userService.softDelete(id);
    }
}
