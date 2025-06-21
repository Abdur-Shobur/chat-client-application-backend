import mongoose, { HydratedDocument } from 'mongoose';
import { IGroup, IGroupStatus } from '../interfaces/group.interfaces';
export type GroupDocument = HydratedDocument<Group>;
export declare class Group implements IGroup {
    name: string;
    description: string;
    iconUrl?: string;
    createdBy: string;
    joinType?: 'public' | 'private';
    joinLink?: string;
    joinApprovalType?: 'auto' | 'admin';
    welcomeMessage: string;
    members?: string[];
    pendingMembers?: string[];
    tags?: string[];
    status?: IGroupStatus;
}
export declare const GroupSchema: mongoose.Schema<Group, mongoose.Model<Group, any, any, any, mongoose.Document<unknown, any, Group, any> & Group & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Group, mongoose.Document<unknown, {}, mongoose.FlatRecord<Group>, {}> & mongoose.FlatRecord<Group> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
