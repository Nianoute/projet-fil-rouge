import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & import("./entities/user.entity").UserEntity>;
    findAll(): Promise<import("./entities/user.entity").UserEntity[]>;
    findOne(id: number): Promise<import("./entities/user.entity").UserEntity>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        password: string;
        email: string;
        userName: string;
        id: number;
        posts: import("../post/entities/post.entity").PostEntity[];
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
    }>;
    softDelete(id: number): Promise<import("typeorm").UpdateResult>;
}
