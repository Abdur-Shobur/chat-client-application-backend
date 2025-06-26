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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const helper_1 = require("../helper");
const auth_guard_1 = require("../helper/auth-guard");
const decorator_1 = require("../role/decorator");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll(req, status) {
        const userId = req?.user?.id;
        const result = await this.userService.findAllUser(status, userId);
        if (!result) {
            return helper_1.ResponseHelper.error('User not found');
        }
        return helper_1.ResponseHelper.success(result);
    }
    async findOne(id) {
        const result = await this.userService.findById(id);
        if (!result)
            return helper_1.ResponseHelper.error('User not found');
        return helper_1.ResponseHelper.success(result);
    }
    async create(createUserDto) {
        const result = await this.userService.create(createUserDto);
        if (!result)
            return helper_1.ResponseHelper.error('User not created');
        return helper_1.ResponseHelper.success(result, 'User created successfully');
    }
    async updateStatus(id, updateStatusDto) {
        const result = await this.userService.updateStatus(id, updateStatusDto.status);
        if (!result) {
            return helper_1.ResponseHelper.error('Status not updated');
        }
        return helper_1.ResponseHelper.success(result, 'Status updated successfully');
    }
    async update(id, updateUserDto) {
        const result = await this.userService.update(id, updateUserDto);
        if (!result)
            return helper_1.ResponseHelper.error('User not updated');
        return helper_1.ResponseHelper.success(result, 'User updated successfully');
    }
    async delete(id) {
        const result = await this.userService.delete(id);
        if (!result)
            return helper_1.ResponseHelper.error('User not deleted');
        return helper_1.ResponseHelper.success(result, 'User deleted successfully');
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, decorator_1.Roles)(decorator_1.Role.USER_ALL),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map