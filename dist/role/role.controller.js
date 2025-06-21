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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const helper_1 = require("../helper");
const role_service_1 = require("./role.service");
const create_role_dto_1 = require("./dto/create-role.dto");
const update_role_dto_1 = require("./dto/update-role.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
const auth_guard_1 = require("../helper/auth-guard");
const decorator_1 = require("./decorator");
let RoleController = class RoleController {
    constructor(RoleService) {
        this.RoleService = RoleService;
    }
    async create(createRoleDto) {
        const result = await this.RoleService.create(createRoleDto);
        if (!result) {
            return helper_1.ResponseHelper.error('Role not created');
        }
        return helper_1.ResponseHelper.success(result, 'Role created successfully');
    }
    async findAll(status) {
        const result = await this.RoleService.findAll(status);
        if (!result) {
            return helper_1.ResponseHelper.error('Role not found');
        }
        return helper_1.ResponseHelper.success(result);
    }
    async findOne(id) {
        const result = await this.RoleService.findOne(id);
        if (!result) {
            return helper_1.ResponseHelper.error('Role not found');
        }
        return helper_1.ResponseHelper.success(result);
    }
    async update(id, updateRoleDto) {
        const getRole = await this.RoleService.findOne(id);
        if (!getRole) {
            return helper_1.ResponseHelper.error('Role not found');
        }
        const result = await this.RoleService.update(id, updateRoleDto);
        if (!result) {
            return helper_1.ResponseHelper.error('Role not updated');
        }
        return helper_1.ResponseHelper.success(result, 'Role updated successfully');
    }
    async updateStatus(id, updateStatusDto) {
        const result = await this.RoleService.updateStatus(id, updateStatusDto.status);
        if (!result) {
            return helper_1.ResponseHelper.error('Status not updated');
        }
        return helper_1.ResponseHelper.success(result, 'Status updated successfully');
    }
    async remove(id) {
        const result = await this.RoleService.remove(id);
        if (!result) {
            return helper_1.ResponseHelper.error('Role not deleted');
        }
        return helper_1.ResponseHelper.success(result, 'Role deleted successfully');
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_1.Roles)(decorator_1.Role.ROLE_CREATE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_1.Roles)(decorator_1.Role.ROLE_ALL),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_1.Roles)(decorator_1.Role.ROLE_VIEW),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_1.Roles)(decorator_1.Role.ROLE_UPDATE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('status/:id'),
    (0, decorator_1.Roles)(decorator_1.Role.ROLE_STATUS),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_1.Roles)(decorator_1.Role.ROLE_DELETE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "remove", null);
exports.RoleController = RoleController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
//# sourceMappingURL=role.controller.js.map