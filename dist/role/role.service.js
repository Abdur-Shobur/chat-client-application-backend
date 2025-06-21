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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const role_schema_1 = require("./schemas/role.schema");
let RoleService = class RoleService {
    constructor(RoleModel) {
        this.RoleModel = RoleModel;
    }
    async create(createRoleDto) {
        const lengthOfItem = await this.RoleModel.countDocuments();
        const result = await this.RoleModel.create({
            ...createRoleDto,
            position: lengthOfItem + 1,
        });
        return result;
    }
    async findAll(status) {
        const query = {};
        if (status === 'active' || status === 'inactive' || status === 'deleted') {
            query.status = status;
        }
        const result = await this.RoleModel.find(query)
            .sort({ position: 1 })
            .populate({
            path: 'permissions',
            populate: {
                path: 'category',
                select: 'name status',
            },
        })
            .lean()
            .exec();
        return result;
    }
    async findOne(id) {
        return await this.RoleModel.findById(id)
            .populate({
            path: 'permissions',
            populate: {
                path: 'category',
                select: 'name status',
            },
        })
            .lean()
            .exec();
    }
    async update(id, updateRoleDto) {
        return await this.RoleModel.findByIdAndUpdate(id, updateRoleDto);
    }
    async updateStatus(id, status) {
        return await this.RoleModel.findByIdAndUpdate(id, { status }, { new: true, useFindAndModify: false });
    }
    async remove(id) {
        return await this.RoleModel.findByIdAndDelete(id);
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RoleService);
//# sourceMappingURL=role.service.js.map