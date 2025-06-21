import mongoose, { HydratedDocument } from 'mongoose';
import { IRole, IRoleStatus, IRoleType } from '../interfaces/role.interfaces';
export type RoleDocument = HydratedDocument<Role>;
export declare class Role implements IRole {
    name: string;
    type: IRoleType;
    permissions: string[];
    description: string;
    position: number;
    status?: IRoleStatus;
}
export declare const RoleSchema: mongoose.Schema<Role, mongoose.Model<Role, any, any, any, mongoose.Document<unknown, any, Role, any> & Role & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Role, mongoose.Document<unknown, {}, mongoose.FlatRecord<Role>, {}> & mongoose.FlatRecord<Role> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
