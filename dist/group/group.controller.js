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
exports.GroupController = void 0;
const common_1 = require("@nestjs/common");
const group_service_1 = require("./group.service");
const create_group_dto_1 = require("./dto/create-group.dto");
const update_group_dto_1 = require("./dto/update-group.dto");
const helper_1 = require("../helper");
const auth_guard_1 = require("../helper/auth-guard");
const update_status_dto_1 = require("./dto/update-status.dto");
const join_group_dto_1 = require("./dto/join-group.dto");
let GroupController = class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async create(req, createGroupDto) {
        const data = {
            ...createGroupDto,
            createdBy: req.user._id,
        };
        if (!data.members.includes(req.user._id)) {
            data.members.push(req.user._id);
        }
        const result = await this.groupService.create(data);
        if (!result)
            return helper_1.ResponseHelper.error('Group not created');
        return helper_1.ResponseHelper.success(result, 'Group created successfully');
    }
    async findAll(joinType) {
        const result = await this.groupService.findAll(joinType);
        if (!result)
            return helper_1.ResponseHelper.error('Groups not found');
        return helper_1.ResponseHelper.success(result);
    }
    async myGroups(req) {
        const userId = req.user._id;
        const result = await this.groupService.getMyJoinedGroups(userId);
        if (!result)
            return helper_1.ResponseHelper.error('Groups not found');
        return helper_1.ResponseHelper.success(result);
    }
    async joinGroup(dto, req) {
        const userId = req.user._id;
        const result = await this.groupService.joinGroup(dto.groupId, userId);
        if (!result) {
            return helper_1.ResponseHelper.error('Failed to join group');
        }
        return helper_1.ResponseHelper.success(result);
    }
    async findOne(id) {
        const result = await this.groupService.findOne(id);
        if (!result)
            return helper_1.ResponseHelper.error('Group not found');
        return helper_1.ResponseHelper.success(result);
    }
    async update(id, updateGroupDto) {
        const existing = await this.groupService.findOne(id);
        if (!existing)
            return helper_1.ResponseHelper.error('Group not found');
        const result = await this.groupService.update(id, updateGroupDto);
        if (!result)
            return helper_1.ResponseHelper.error('Group not updated');
        return helper_1.ResponseHelper.success(result, 'Group updated successfully');
    }
    async updateStatus(id, updateStatusDto) {
        const result = await this.groupService.updateStatus(id, updateStatusDto.status);
        if (!result)
            return helper_1.ResponseHelper.error('Status not updated');
        return helper_1.ResponseHelper.success(result, 'Status updated successfully');
    }
    async remove(id) {
        const result = await this.groupService.remove(id);
        if (!result)
            return helper_1.ResponseHelper.error('Group not deleted');
        return helper_1.ResponseHelper.success(result, 'Group deleted successfully');
    }
};
exports.GroupController = GroupController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_group_dto_1.CreateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('joinType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-groups'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "myGroups", null);
__decorate([
    (0, common_1.Post)('join'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [join_group_dto_1.JoinGroupDto, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "joinGroup", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_group_dto_1.UpdateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "remove", null);
exports.GroupController = GroupController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('group'),
    __metadata("design:paramtypes", [group_service_1.GroupService])
], GroupController);
//# sourceMappingURL=group.controller.js.map