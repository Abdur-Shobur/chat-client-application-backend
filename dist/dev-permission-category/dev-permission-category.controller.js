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
exports.DevPermissionCategoryController = void 0;
const common_1 = require("@nestjs/common");
const helper_1 = require("../helper");
const dev_permission_category_service_1 = require("./dev-permission-category.service");
const create_dev_permission_category_dto_1 = require("./dto/create-dev-permission-category.dto");
const update_dev_permission_category_dto_1 = require("./dto/update-dev-permission-category.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
let DevPermissionCategoryController = class DevPermissionCategoryController {
    constructor(DevPermissionCategoryService) {
        this.DevPermissionCategoryService = DevPermissionCategoryService;
    }
    async create(createDevPermissionCategoryDto) {
        const result = await this.DevPermissionCategoryService.create(createDevPermissionCategoryDto);
        if (!result) {
            return helper_1.ResponseHelper.error('Dev Permission Category not created');
        }
        return helper_1.ResponseHelper.success(result, 'Dev Permission Category created successfully');
    }
    async findAll(status) {
        const result = await this.DevPermissionCategoryService.findAll(status);
        if (!result) {
            return helper_1.ResponseHelper.error('Dev Permission Category not found');
        }
        return helper_1.ResponseHelper.success(result);
    }
    async findOne(id) {
        const result = await this.DevPermissionCategoryService.findOne(id);
        if (!result) {
            return helper_1.ResponseHelper.error('Dev Permission Category not found');
        }
        return helper_1.ResponseHelper.success(result);
    }
    async update(id, updateDevPermissionCategoryDto) {
        const result = await this.DevPermissionCategoryService.update(id, updateDevPermissionCategoryDto);
        if (!result) {
            return helper_1.ResponseHelper.error('Dev Permission Category not updated');
        }
        return helper_1.ResponseHelper.success(result, 'Dev Permission Category updated successfully');
    }
    async updateStatus(id, updateStatusDto) {
        const result = await this.DevPermissionCategoryService.updateStatus(id, updateStatusDto.status);
        if (!result) {
            return helper_1.ResponseHelper.error('Status not updated');
        }
        return helper_1.ResponseHelper.success(result, 'Status updated successfully');
    }
    async remove(id) {
        const result = await this.DevPermissionCategoryService.remove(id);
        if (!result) {
            return helper_1.ResponseHelper.error('Dev Permission Category not deleted');
        }
        return helper_1.ResponseHelper.success(result, 'Dev Permission Category deleted successfully');
    }
};
exports.DevPermissionCategoryController = DevPermissionCategoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dev_permission_category_dto_1.CreateDevPermissionCategoryDto]),
    __metadata("design:returntype", Promise)
], DevPermissionCategoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DevPermissionCategoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DevPermissionCategoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dev_permission_category_dto_1.UpdateDevPermissionCategoryDto]),
    __metadata("design:returntype", Promise)
], DevPermissionCategoryController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", Promise)
], DevPermissionCategoryController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DevPermissionCategoryController.prototype, "remove", null);
exports.DevPermissionCategoryController = DevPermissionCategoryController = __decorate([
    (0, common_1.Controller)('dev-permission-category'),
    __metadata("design:paramtypes", [dev_permission_category_service_1.DevPermissionCategoryService])
], DevPermissionCategoryController);
//# sourceMappingURL=dev-permission-category.controller.js.map