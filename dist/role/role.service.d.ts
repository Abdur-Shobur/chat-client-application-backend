import { Model } from 'mongoose';
import { Role } from './schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IRoleStatus } from './interfaces/role.interfaces';
export declare class RoleService {
    private RoleModel;
    constructor(RoleModel: Model<Role>);
    create(createRoleDto: CreateRoleDto): Promise<import("mongoose").Document<unknown, {}, Role, {}> & Role & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(status?: string): Promise<any>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<{
        name: string;
        type: import("./interfaces/role.interfaces").IRoleType;
        permissions: string[];
        description: string;
        position: number;
        status?: IRoleStatus;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<import("mongoose").Document<unknown, {}, Role, {}> & Role & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateStatus(id: string, status: IRoleStatus): Promise<import("mongoose").Document<unknown, {}, Role, {}> & Role & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Role, {}> & Role & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
