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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const group_schema_1 = require("./schemas/group.schema");
let GroupService = class GroupService {
    constructor(groupModel) {
        this.groupModel = groupModel;
    }
    async create(createGroupDto) {
        const group = new this.groupModel(createGroupDto);
        return await group.save();
    }
    async findAll(joinType) {
        const query = {};
        if (joinType) {
            query.joinType = joinType;
        }
        return await this.groupModel
            .find(query)
            .sort({ createdAt: -1 })
            .lean()
            .exec();
    }
    async findOne(id) {
        const group = await this.groupModel.findById(id).lean().exec();
        if (!group) {
            throw new common_1.NotFoundException(`Group with ID ${id} not found`);
        }
        return group;
    }
    async update(id, updateGroupDto) {
        const updated = await this.groupModel.findByIdAndUpdate(id, updateGroupDto, {
            new: true,
            useFindAndModify: false,
        });
        if (!updated) {
            throw new common_1.NotFoundException(`Group with ID ${id} not found`);
        }
        return updated;
    }
    async joinGroup(groupId, userId) {
        const group = await this.groupModel.findById(groupId);
        if (!group)
            throw new common_1.NotFoundException('Group not found');
        if (group.members?.includes(userId)) {
            throw new common_1.NotFoundException('You are already a member of this group.');
        }
        if (group.pendingMembers?.includes(userId)) {
            throw new common_1.NotFoundException('Your request to join is already pending.');
        }
        if (group.joinApprovalType === 'auto') {
            group.members.push(userId);
            await group.save();
            return { message: 'Successfully joined the group.' };
        }
        else if (group.joinApprovalType === 'admin') {
            group.pendingMembers.push(userId);
            await group.save();
            return { message: 'Join request submitted. Waiting for admin approval.' };
        }
        throw new common_1.NotFoundException('Invalid group configuration.');
    }
    async updateMembers(id, members) {
        const group = await this.groupModel.findByIdAndUpdate(id, { members }, { new: true, useFindAndModify: false });
        if (!group) {
            throw new common_1.NotFoundException(`Group with ID ${id} not found`);
        }
        return group;
    }
    async updateStatus(id, status) {
        return await this.groupModel.findByIdAndUpdate(id, { status }, { new: true, useFindAndModify: false });
    }
    async getMyJoinedGroups(userId) {
        return this.groupModel
            .find({ members: userId })
            .populate('tags')
            .select('-pendingMembers');
    }
    async remove(id) {
        const deleted = await this.groupModel.findByIdAndDelete(id);
        if (!deleted) {
            throw new common_1.NotFoundException(`Group with ID ${id} not found`);
        }
        return deleted;
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(group_schema_1.Group.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GroupService);
//# sourceMappingURL=group.service.js.map