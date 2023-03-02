import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gameService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(id, updateGameDto);
  }

  @Delete(':id')
    softDelete(@Param('id', ParseIntPipe) id: number) {
      return this.gameService.softDelete(id);
    }
}
