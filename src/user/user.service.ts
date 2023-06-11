import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { uploadFileSupabase } from 'src/supabaseclient';
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
        userUpdate.password = await bcrypt.hash(userUpdate.password, salt);
        await this.userRepository.save(userUpdate);

        return userUpdate;
    }

    async create(data: CreateUserDto, files: any) {
        try {
            let error = false;
            if (files){
                if(files.length > 0) {
                    const size = files[0].size;
                    if (size > 1000000) {
                        error = true;
                    }
                    const file = await uploadFileSupabase(files, 'avatar')
                    if (file.error) {
                        error = true;
                    } else {
                        data.avatar = file.data.path;
                    }
                    console.log(file);
                } else {
                    data.avatar = "./default_userlogo.png";
                }
            } else {
                data.avatar = "./default_userlogo.png";
            }

            data.password = await bcrypt.hash(data.password, salt);

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
