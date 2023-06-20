import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    findAll(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity>;
    softDelete(id: number): Promise<import("typeorm").UpdateResult>;
    update(data: UpdateUserDto): Promise<{
        password: string;
        email: string;
        userName: string;
        admin: boolean;
        avatar: string;
        id: number;
        posts: import("../post/entities/post.entity").PostEntity[];
        comments: import("../comment/entities/comment.entity").CommentEntity[];
        postLiked: import("../post/entities/post.entity").PostEntity[];
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }>;
    updateAvatar(id: number, data: UpdateUserDto, files: any): Promise<any>;
    create(data: CreateUserDto, files: any): Promise<void>;
    findOneByEmail(email: string): Promise<UserEntity>;
}
