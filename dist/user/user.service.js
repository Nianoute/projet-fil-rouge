"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const supabaseclient_1 = require("../supabaseclient");
const salt = 10;
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(id) {
        const query = this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.posts', 'posts');
        const user = await query.where('user.id = :id', { id }).getOne();
        try {
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error('Error while creating user');
        }
    }
    async softDelete(id) {
        return await this.userRepository.softDelete(id);
    }
    async update(data) {
        const user = await this.findOneByEmail(data.email);
        if (!user) {
            throw new common_1.NotFoundException(`User ${data.email} not found`);
        }
        const userUpdate = Object.assign(Object.assign({}, user), data);
        userUpdate.password = await bcrypt.hash(userUpdate.password, salt);
        await this.userRepository.save(userUpdate);
        return userUpdate;
    }
    async updateAvatar(id, files) {
        console.log(files);
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException(`User ${id} not found`);
        }
        const userUpdate = Object.assign(Object.assign({}, user), files);
        if (files) {
            if (files.length > 0) {
                const size = files[0].size;
                if (size > 1000000) {
                    throw new Error('File too large');
                }
                const file = await (0, supabaseclient_1.uploadFileSupabase)(files, 'avatar');
                if (file.error) {
                    throw new Error('Error while uploading file');
                }
                else {
                    userUpdate.avatar =
                        'https://plovjzslospfwozcaesq.supabase.co/storage/v1/object/public/avatar/' +
                            file.data.path;
                }
                console.log(file);
            }
            else {
                userUpdate.avatar = '';
            }
        }
        else {
            userUpdate.avatar = '';
        }
        await this.userRepository.save(userUpdate);
        return userUpdate;
    }
    async create(data, files) {
        try {
            let error = false;
            if (files) {
                if (files.length > 0) {
                    const size = files[0].size;
                    if (size > 1000000) {
                        error = true;
                    }
                    const file = await (0, supabaseclient_1.uploadFileSupabase)(files, 'avatar');
                    if (file.error) {
                        error = true;
                    }
                    else {
                        data.avatar =
                            'https://plovjzslospfwozcaesq.supabase.co/storage/v1/object/public/avatar/' +
                                file.data.path;
                    }
                    console.log(file);
                }
                else {
                    data.avatar = '';
                }
            }
            else {
                data.avatar = '';
            }
            data.password = await bcrypt.hash(data.password, salt);
            if (data.admin == null) {
                data.admin = false;
            }
            if (!error) {
                return await this.userRepository.save(data);
            }
            else {
                throw new Error('Error while creating user');
            }
        }
        catch (error) {
            console.log(error);
            throw new Error('Error while creating user');
        }
    }
    async findOneByEmail(email) {
        return await this.userRepository.findOneBy({ email });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map