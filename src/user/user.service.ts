import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
const salt = 10;

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
        const user = await this.findOneByEmail(data.email);
        if (!user) {
            throw new NotFoundException(`User ${data.email} not found`);
          }
        const userUpdate = { ...user, ...data };
        userUpdate.password = await bcrypt.hash(userUpdate.password, salt)
        await this.userRepository.save(userUpdate);

        return userUpdate;
    }

    async create(data: CreateUserDto) {
        try {
            let error = false;

            const passwordLenght = data.password.length;
            if (passwordLenght < 8) {
                error = true;
                const errorMessage = "Pour votre sécurité, mettez un mot de passe supérieur à 8 caractère";
                return errorMessage
            } else {
                data.password = await bcrypt.hash(data.password, salt);
            }

            if (data.admin == null) {
                data.admin = false
            }

            if (!error){
              return await this.userRepository.save(data);
            } else {
                throw new Error('Error while creating user');
            }

        } catch (error) {
          console.log(error);
          throw new Error('Error while creating user');
        }
      }

    async findOneByEmail(email: string) : Promise<UserEntity> {
        return await this.userRepository.findOneBy({ email })
    }
}
