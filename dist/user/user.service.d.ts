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
    update(id: number, data: UpdateUserDto): Promise<{
        password: string;
        email: string;
        userName: string;
        admin: boolean;
        id: number;
        posts: import("../post/entities/post.entity").PostEntity[];
        comments: import("../comment/entities/comment.entity").CommentEntity[];
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }>;
    create(data: CreateUserDto): Promise<"Pour votre sécurité, mettez un mot de passe supérieur à 8 caractère" | (CreateUserDto & UserEntity)>;
    findOneByEmail(email: string): Promise<UserEntity>;
}
