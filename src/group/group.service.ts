import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Group, GroupDocument } from './schemas/group.schema';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name)
    private readonly groupModel: Model<GroupDocument>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = new this.groupModel(createGroupDto);
    return await group.save();
  }

  async findAll(joinType?: 'public' | 'private') {
    const query: Record<string, any> = {};
    if (joinType) {
      query.joinType = joinType;
    }

    return await this.groupModel
      .find(query)
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async findOne(id: string) {
    const group = await this.groupModel
      .findById(id)
      .populate({
        path: 'members',
        select: '-password',
      })
      .populate({
        path: 'leaveMembers',
        select: '-password',
      })
      .lean()
      .exec();
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const updated = await this.groupModel.findByIdAndUpdate(
      id,
      updateGroupDto,
      {
        new: true,
        useFindAndModify: false,
      },
    );
    if (!updated) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return updated;
  }

  // group.service.ts
  // async joinGroup(groupId: string, userId: string) {
  //   const group = await this.groupModel.findById(groupId);
  //   if (!group) throw new NotFoundException('Group not found');

  //   // Ensure not already a member or pending
  //   if (group.members?.includes(userId)) {
  //     throw new NotFoundException('You are already a member of this group.');
  //   }
  //   if (group.pendingMembers?.includes(userId)) {
  //     throw new NotFoundException('Your request to join is already pending.');
  //   }

  //   // Auto approve or wait for admin approval
  //   if (group.joinApprovalType === 'auto') {
  //     group.members.push(userId);
  //     await group.save();
  //     return { message: 'Successfully joined the group.' };
  //   } else if (group.joinApprovalType === 'admin') {
  //     group.pendingMembers.push(userId);
  //     await group.save();
  //     return { message: 'Join request submitted. Waiting for admin approval.' };
  //   }

  //   throw new NotFoundException('Invalid group configuration.');
  // }
  async joinGroup(groupId: string, userId: string) {
    const group = await this.groupModel.findById(groupId);
    if (!group) throw new NotFoundException('Group not found');

    // Ensure not already a member or pending
    if (group.members?.includes(userId)) {
      throw new NotFoundException('You are already a member of this group.');
    }
    if (group.pendingMembers?.includes(userId)) {
      throw new NotFoundException('Your request to join is already pending.');
    }

    // Auto approve or wait for admin approval
    if (group.joinApprovalType === 'auto') {
      // Remove from leaveMembers when joining and add to members
      await this.groupModel.findByIdAndUpdate(groupId, {
        $push: { members: userId },
        $pull: { leaveMembers: userId }, // Remove from leaveMembers when rejoining
      });
      return { message: 'Successfully joined the group.' };
    } else if (group.joinApprovalType === 'admin') {
      group.pendingMembers.push(userId);
      await group.save();
      return { message: 'Join request submitted. Waiting for admin approval.' };
    }

    throw new NotFoundException('Invalid group configuration.');
  }

  async updateMembers(id: string, members: string[]) {
    const group = await this.groupModel.findByIdAndUpdate(
      id,
      { members },
      { new: true, useFindAndModify: false },
    );
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return group;
  }

  async getMemberDetails(id: string) {
    const group = await this.groupModel
      .findById(id)
      .populate('members', 'name email phone status') // Select specific fields
      .populate('pendingMembers', 'name email phone status') // Optional
      .lean()
      .exec();

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return group;
  }

  async approveJoinRequest(groupId: string, userId: string) {
    return await this.groupModel.findByIdAndUpdate(
      groupId,
      {
        $pull: { pendingMembers: userId, leaveMembers: userId },
        $push: { members: userId },
      },
      { new: true, useFindAndModify: false },
    );
  }

  async updateStatus(id: string, status: 'active' | 'inactive' | 'deleted') {
    return await this.groupModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, useFindAndModify: false },
    );
  }

  // async leaveGroup(id: string, userId: string) {
  //   return await this.groupModel.findByIdAndUpdate(
  //     id,
  //     { $pull: { members: userId } },
  //     { new: true, useFindAndModify: false },
  //   );
  // }

  async leaveGroup(id: string, userId: string) {
    return await this.groupModel.findByIdAndUpdate(
      id,
      {
        $pull: { members: userId },
        $addToSet: { leaveMembers: userId }, // Add to leaveMembers if not already present
      },
      { new: true, useFindAndModify: false },
    );
  }

  //  Get groups where the user is a member
  async getMyJoinedGroups(userId: string) {
    return this.groupModel
      .find({ members: userId })
      .populate('tags') // optional
      .select('-pendingMembers'); // optionally hide
  }

  async remove(id: string) {
    const deleted = await this.groupModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return deleted;
  }
  async getUserGroups(userId: string) {
    return this.groupModel.aggregate([
      {
        $match: {
          members: new Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'messages',
          let: { groupId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$receiver', '$$groupId'] } } },
            { $sort: { createdAt: -1 } },
            { $limit: 1 },
          ],
          as: 'lastMessage',
        },
      },
      {
        $addFields: {
          lastMessage: { $arrayElemAt: ['$lastMessage', 0] },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          lastMessage: {
            text: '$lastMessage.text',
            type: '$lastMessage.type',
            createdAt: '$lastMessage.createdAt',
          },
          chatType: { $literal: 'group' },
          participants: '$members',
        },
      },
    ]);
  }
}
