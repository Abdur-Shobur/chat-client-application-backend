import mongoose, { HydratedDocument } from 'mongoose';
import { IUser, IUserStatus } from '../interfaces/user.interfaces';
export type UserDocument = HydratedDocument<User>;
export declare class User implements IUser {
    name: string;
    phone: string;
    email: string;
    password: string;
    role: string;
    position: number;
    status?: IUserStatus;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User, any> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>, {}> & mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
