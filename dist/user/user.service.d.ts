import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    findAll(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity>;
    delete(id: number): Promise<import("typeorm").UpdateResult>;
    update(id: number, user: any): Promise<import("typeorm").UpdateResult>;
    create(user: any): Promise<any>;
}
