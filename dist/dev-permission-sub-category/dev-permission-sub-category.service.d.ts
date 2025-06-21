import { DevPermissionSubCategory } from './schemas/dev-permission-sub-category.schema';
import { Model, Types } from 'mongoose';
import { CreateDevPermissionSubCategoryDto } from './dto/create-dev-permission-sub-category.dto';
import { UpdateDevPermissionSubCategoryDto } from './dto/update-dev-permission-sub-category.dto';
import { IDevPermissionSubCategoryStatus } from './interfaces/dev-permission-sub-category.interfaces';
export declare class DevPermissionSubCategoryService {
    private DevPermissionSubCategoryModel;
    constructor(DevPermissionSubCategoryModel: Model<DevPermissionSubCategory>);
    create(createDevPermissionSubCategoryDto: CreateDevPermissionSubCategoryDto): Promise<import("mongoose").Document<unknown, {}, DevPermissionSubCategory, {}> & DevPermissionSubCategory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(status?: string): Promise<any>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<{
        name: string;
        category: string;
        permissionKey: string;
        description: string;
        position: number;
        status?: IDevPermissionSubCategoryStatus;
    }> & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, updateDevPermissionSubCategoryDto: UpdateDevPermissionSubCategoryDto): Promise<import("mongoose").Document<unknown, {}, DevPermissionSubCategory, {}> & DevPermissionSubCategory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateStatus(id: string, status: IDevPermissionSubCategoryStatus): Promise<import("mongoose").Document<unknown, {}, DevPermissionSubCategory, {}> & DevPermissionSubCategory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, DevPermissionSubCategory, {}> & DevPermissionSubCategory & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
}
