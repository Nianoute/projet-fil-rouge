import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameEntity } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>
  ){}

  async create(createGameDto: CreateGameDto) {
    return await this.gameRepository.save(createGameDto);
  }

  async findAll() {
    return await this.gameRepository.find();
  }

  async findOne(id: number) {
    return await this.gameRepository.findOneBy({id});
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    const game = await this.findOne(id);

    if (!game) {
      throw new NotFoundException(`game #${id} not found`);
    }

    const gameUpdate = { ...game, ...updateGameDto };

    await this.gameRepository.save(gameUpdate);

    return gameUpdate;
  }

  async softDelete(id: number) {
    return await this.gameRepository.softDelete(id);
  }
}
