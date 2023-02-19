import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(): Promise<import("./user.entity").UserEntity[]>;
    getOne(id: number): Promise<import("./user.entity").UserEntity>;
    delete(id: number): Promise<import("typeorm").UpdateResult>;
    update(id: number, user: any): Promise<import("typeorm").UpdateResult>;
    create(user: any): Promise<any>;
}
