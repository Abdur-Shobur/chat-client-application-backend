import { HydratedDocument } from 'mongoose';
import { IDevPermissionCategory, IDevPermissionCategoryStatus } from '../interfaces/dev-permission-category.interfaces';
export type DevPermissionCategoryDocument = HydratedDocument<DevPermissionCategory>;
export declare class DevPermissionCategory implements IDevPermissionCategory {
    name: string;
    permissionKey: string;
    description: string;
    position: number;
    status?: IDevPermissionCategoryStatus;
}
export declare const DevPermissionCategorySchema: import("mongoose").Schema<DevPermissionCategory, import("mongoose").Model<DevPermissionCategory, any, any, any, import("mongoose").Document<unknown, any, DevPermissionCategory, any> & DevPermissionCategory & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DevPermissionCategory, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<DevPermissionCategory>, {}> & import("mongoose").FlatRecord<DevPermissionCategory> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
