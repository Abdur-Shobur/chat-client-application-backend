import mongoose, { HydratedDocument, Types } from 'mongoose';
import { IDevPermissionSubCategory, IDevPermissionSubCategoryStatus } from '../interfaces/dev-permission-sub-category.interfaces';
export type DevPermissionSubCategoryDocument = HydratedDocument<DevPermissionSubCategory>;
export declare class DevPermissionSubCategory implements IDevPermissionSubCategory {
    name: string;
    category: string;
    permissionKey: string;
    description: string;
    position: number;
    status?: IDevPermissionSubCategoryStatus;
}
export declare const DevPermissionSubCategorySchema: mongoose.Schema<DevPermissionSubCategory, mongoose.Model<DevPermissionSubCategory, any, any, any, mongoose.Document<unknown, any, DevPermissionSubCategory, any> & DevPermissionSubCategory & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, DevPermissionSubCategory, mongoose.Document<unknown, {}, mongoose.FlatRecord<DevPermissionSubCategory>, {}> & mongoose.FlatRecord<DevPermissionSubCategory> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
