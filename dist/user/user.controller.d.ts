import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(data: CreateUserDto, file: any): Promise<CreateUserDto & import("./entities/user.entity").UserEntity>;
    findAll(): Promise<import("./entities/user.entity").UserEntity[]>;
    findOne(id: number): Promise<import("./entities/user.entity").UserEntity>;
    findOneByEmail(email: string): Promise<import("./entities/user.entity").UserEntity>;
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
    updateAvatar(id: number, files: any): Promise<any>;
    softDelete(id: number): Promise<import("typeorm").UpdateResult>;
}
