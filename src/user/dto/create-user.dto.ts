export class CreateUserDto {
    password: string;
    email: string;
    userName: string;
    admin: boolean;
    avatar: string;
    files?: any;
}
