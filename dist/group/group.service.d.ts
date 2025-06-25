import { Model, Types } from 'mongoose';
import { Group, GroupDocument } from './schemas/group.schema';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupService {
    private readonly groupModel;
    constructor(groupModel: Model<GroupDocument>);
    create(createGroupDto: CreateGroupDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    findAll(joinType?: 'public' | 'private'): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    joinGroup(groupId: string, userId: string): Promise<{
        message: string;
    }>;
    updateMembers(id: string, members: string[]): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getMemberDetails(id: string): Promise<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: Types.ObjectId;
    }>>;
    updateStatus(id: string, status: 'active' | 'inactive' | 'deleted'): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    leaveGroup(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getMyJoinedGroups(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, Group, {}> & Group & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    getUserGroups(userId: string): Promise<any[]>;
}
