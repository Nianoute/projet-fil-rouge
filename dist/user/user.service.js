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
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(id) {
        return await this.userRepository.findOneBy({ id });
    }
    async softDelete(id) {
        return await this.userRepository.softDelete(id);
    }
    async update(id, data) {
        const user = await this.userRepository.findOneBy({ id });
        const userUpdate = Object.assign(Object.assign({}, user), data);
        await this.userRepository.save(userUpdate);
        return userUpdate;
    }
    async create(createUserDto) {
        try {
            createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
            return await this.userRepository.save(createUserDto);
        }
        catch (error) {
            console.log(error);
            throw new Error('Error while creating user');
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map