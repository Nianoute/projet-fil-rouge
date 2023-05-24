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
const salt = 10;
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
        const user = await this.findOneByEmail(data.email);
        if (!user) {
            throw new common_1.NotFoundException(`User ${data.email} not found`);
        }
        const userUpdate = Object.assign(Object.assign({}, user), data);
        userUpdate.password = await bcrypt.hash(userUpdate.password, salt);
        await this.userRepository.save(userUpdate);
        return userUpdate;
    }
    async create(data) {
        try {
            let error = false;
            const passwordLenght = data.password.length;
            if (passwordLenght < 8) {
                error = true;
                const errorMessage = "Pour votre sécurité, mettez un mot de passe supérieur à 8 caractère";
                return errorMessage;
            }
            else {
                data.password = await bcrypt.hash(data.password, salt);
            }
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