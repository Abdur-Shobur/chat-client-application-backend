import { DevPermissionCategory } from './schemas/dev-permission-category.schema';
import { Model } from 'mongoose';
import { CreateDevPermissionCategoryDto } from './dto/create-dev-permission-category.dto';
import { UpdateDevPermissionCategoryDto } from './dto/update-dev-permission-category.dto';
import { IDevPermissionCategoryStatus } from './interfaces/dev-permission-category.interfaces';
import { DevPermissionSubCategory } from 'src/dev-permission-sub-category/schemas/dev-permission-sub-category.schema';
export declare class DevPermissionCategoryService {
    private DevPermissionCategoryModel;
    private DevPermissionSubCategoryModel;
    constructor(DevPermissionCategoryModel: Model<DevPermissionCategory>, DevPermissionSubCategoryModel: Model<DevPermissionSubCategory>);
    create(createDevPermissionCategoryDto: CreateDevPermissionCategoryDto): Promise<import("mongoose").Document<unknown, {}, DevPermissionCategory, {}> & DevPermissionCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(status?: string): Promise<any[]>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<{
        name: string;
        permissionKey: string;
        description: string;
        position: number;
        status?: IDevPermissionCategoryStatus;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, updateDevPermissionCategoryDto: UpdateDevPermissionCategoryDto): Promise<import("mongoose").Document<unknown, {}, DevPermissionCategory, {}> & DevPermissionCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateStatus(id: string, status: IDevPermissionCategoryStatus): Promise<import("mongoose").Document<unknown, {}, DevPermissionCategory, {}> & DevPermissionCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, DevPermissionCategory, {}> & DevPermissionCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
