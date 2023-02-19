import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    getOne(
        @Param('id') id: number,
    ){
        return this.userService.findOne(id);
    }

    @Delete(':id')
    delete(
        @Param('id') id: number,
    ){
        return this.userService.delete(id);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() user,
    ){
        return this.userService.update(id, user);
    }

    @Post()
    create(
        @Body() user
    ){
        return this.userService.create(user);
    }
}
