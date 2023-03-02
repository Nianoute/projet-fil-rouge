import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async findAll() { 
        return await this.userRepository.find();
    }

    async findOne(id: number) {
        return await this.userRepository.findOneBy({id});
    }

    async softDelete(id: number) {
        return await this.userRepository.softDelete(id);
    }

    async update(id: number, data: UpdateUserDto) {
        const user = await this.userRepository.findOneBy({ id });
        const userUpdate = { ...user, ...data };
        await this.userRepository.save(userUpdate);

        return userUpdate;
    }

    async create(createUserDto: CreateUserDto) {
        try {
          createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
          return await this.userRepository.save(createUserDto);
        } catch (error) {
          console.log(error);
          throw new Error('Error while creating user');
        }
      }
}
