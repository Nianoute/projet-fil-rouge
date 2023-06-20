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

    async update(data: UpdateUserDto) {
        const user = await this.findOneByEmail(data.email);
        if (!user) {
            throw new NotFoundException(`User ${data.email} not found`);
          }
        const userUpdate = { ...user, ...data };

        userUpdate.password = await bcrypt.hash(userUpdate.password, salt);
        await this.userRepository.save(userUpdate);

        return userUpdate;
    }

    async updateAvatar(id: number, data: UpdateUserDto, files: any) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User ${data.email} not found`);
            }
        const userUpdate = { ...user, ...data, ...files };

        if (files){
            if(files.length > 0) {
                const size = files[0].size;
                if (size > 1000000) {
                    throw new Error('File too large');
                }
                const file = await uploadFileSupabase(files, 'avatar')
                if (file.error) {
                    throw new Error('Error while uploading file');
                } else {
                    userUpdate.avatar = file.data.path;
                }
                console.log(file);
            } else {
                userUpdate.avatar = "./default_userlogo.png";
            }
        } else {
            userUpdate.avatar = "./default_userlogo.png";
        }

        await this.userRepository.save(userUpdate);

        return userUpdate;
    }

    async create(data: CreateUserDto, files: any) {
        try {
            console.log(data);
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
                        data.avatar = "https://plovjzslospfwozcaesq.supabase.co/storage/v1/object/public/avatar/" + file.data.path;
                    }
                    console.log(file);
                } else {
                    data.avatar = "";
                }
            } else {
                data.avatar = "";
            }

            data.password = await bcrypt.hash(data.password, 10);

            if (data.admin == null) {
                data.admin = false
            }

            if (!error){
            //   return await this.userRepository.save(data);
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
