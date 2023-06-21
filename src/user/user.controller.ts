import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('file'))
    create(
      @Body() data: CreateUserDto,
      @UploadedFiles() file,
      ) {
      return this.userService.create(data, file);
    }
  
    @Get()
    findAll() {
      return this.userService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.userService.findOne(id);
    }

    @Get(':email')
    findOneByEmail(@Param('email') email: string) {
      return this.userService.findOneByEmail(email);
    }
  
    @Put(':email')
    update(@Body() data: UpdateUserDto) {
      return this.userService.update(data);
    }

    @Patch(':id')
    @UseInterceptors(FilesInterceptor('file'))
    updateAvatar(@Param('id', ParseIntPipe) id: number, @UploadedFiles() files) {
      return this.userService.updateAvatar(id, files);
    }
  
    @Delete(':id')
    softDelete(@Param('id', ParseIntPipe) id: number) {
      return this.userService.softDelete(id);
    }
}
