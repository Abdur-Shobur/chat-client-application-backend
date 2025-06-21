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
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
let UserService = class UserService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async create(createUserDto) {
        const result = (await this.UserModel.create(createUserDto)).toJSON();
        return result;
    }
    async findAllUser(status, userId) {
        const query = {};
        if (status === 'active' || status === 'inactive' || status === 'deleted') {
            query.status = status;
        }
        if (userId) {
            query._id = { $ne: userId };
        }
        const result = await this.UserModel.find(query)
            .sort({ position: 1 })
            .select('-password')
            .populate({
            path: 'role',
            select: 'name status',
        })
            .lean()
            .exec();
        return result;
    }
    async findAll(status) {
        const query = {};
        if (status === 'active' || status === 'inactive' || status === 'deleted') {
            query.status = status;
        }
        const result = await this.UserModel.find(query)
            .sort({ position: 1 })
            .populate({
            path: 'role',
            populate: {
                path: 'permissions',
                select: 'name status permissionKey',
            },
        })
            .lean()
            .exec();
        return result;
    }
    async update(id, updateUserDto) {
        return this.UserModel.findByIdAndUpdate(id, updateUserDto, {
            new: true,
        }).exec();
    }
    async updateByEmail(email, updateUserDto) {
        return this.UserModel.findOneAndUpdate({ email }, updateUserDto, { new: true }).exec();
    }
    async findByEmail(email) {
        return await this.UserModel.findOne({ email })
            .populate({
            path: 'role',
            populate: {
                path: 'permissions',
                select: 'name status permissionKey',
            },
        })
            .exec();
    }
    async findByPhone(phone) {
        return await this.UserModel.findOne({ phone })
            .populate({
            path: 'role',
            populate: {
                path: 'permissions',
                select: 'name status permissionKey',
            },
        })
            .exec();
    }
    async findById(id) {
        return await this.UserModel.findOne({ _id: id })
            .populate({
            path: 'role',
            populate: {
                path: 'permissions',
                select: 'name status permissionKey',
            },
        })
            .exec();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map