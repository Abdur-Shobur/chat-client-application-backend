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
exports.TagController = void 0;
const common_1 = require("@nestjs/common");
const tag_service_1 = require("./tag.service");
const helper_1 = require("../helper");
const create_tag_dto_1 = require("./dto/create-tag.dto");
const update_tag_dto_1 = require("./dto/update-tag.dto");
const update_status_dto_1 = require("./dto/update-status.dto");
const auth_guard_1 = require("../helper/auth-guard");
const decorator_1 = require("../role/decorator");
let TagController = class TagController {
    constructor(tagService) {
        this.tagService = tagService;
    }
    async create(createTagDto) {
        const result = await this.tagService.create(createTagDto);
        if (!result) {
            return helper_1.ResponseHelper.error('Tag not created');
        }
        return helper_1.ResponseHelper.success(result, 'Tag created successfully');
    }
    async findAll(status) {
        const result = await this.tagService.findAll(status);
        if (!result) {
            return helper_1.ResponseHelper.error('Tag not found');
        }
        return helper_1.ResponseHelper.success(result);
    }
    async findOne(id) {
        const result = await this.tagService.findOne(id);
        if (!result) {
            return helper_1.ResponseHelper.error('Tag not found');
        }
        return helper_1.ResponseHelper.success(result);
    }
    async update(id, updateTagDto) {
        const result = await this.tagService.update(id, updateTagDto);
        if (!result) {
            return helper_1.ResponseHelper.error('Tag not updated');
        }
        return helper_1.ResponseHelper.success(result, 'Tag updated successfully');
    }
    async updateStatus(id, updateStatusDto) {
        const result = await this.tagService.updateStatus(id, updateStatusDto.status);
        if (!result) {
            return helper_1.ResponseHelper.error('Status not updated');
        }
        return helper_1.ResponseHelper.success(result, 'Status updated successfully');
    }
    async remove(id) {
        const result = await this.tagService.remove(id);
        if (!result) {
            return helper_1.ResponseHelper.error('Tag not deleted');
        }
        return helper_1.ResponseHelper.success(result, 'Tag deleted successfully');
    }
};
exports.TagController = TagController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_1.Roles)(decorator_1.Role.TAG_CREATE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tag_dto_1.CreateTagDto]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_1.Roles)(decorator_1.Role.TAG_ALL),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_1.Roles)(decorator_1.Role.TAG_VIEW),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_1.Roles)(decorator_1.Role.TAG_UPDATE),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tag_dto_1.UpdateTagDto]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('status/:id'),
    (0, decorator_1.Roles)(decorator_1.Role.TAG_STATUS),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_1.Roles)(decorator_1.Role.TAG_DELETE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TagController.prototype, "remove", null);
exports.TagController = TagController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('tag'),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagController);
//# sourceMappingURL=tag.controller.js.map