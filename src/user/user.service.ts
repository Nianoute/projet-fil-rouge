import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    findAll() {
        const users = this.userRepository.find();
        return users;
    }

    findOne(id: number) {
        return this.userRepository.findOneBy({id});
    }

    delete(id: number) {
        return this.userRepository.softDelete(id);
    }

    update(id: number, user) {
        return this.userRepository.update(id, user);
    }

    create(user) {
        return this.userRepository.save(user);
    }
}
