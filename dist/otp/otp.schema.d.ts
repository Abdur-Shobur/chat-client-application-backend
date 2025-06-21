import { HydratedDocument } from 'mongoose';
import { IOtp, IOtpStatus, IOtpType } from './dto/otp.interface';
export type OtpDocument = HydratedDocument<Otp>;
export declare class Otp implements IOtp {
    email: string;
    expiresAt: Date;
    otpCode: string;
    status?: IOtpStatus;
    type: IOtpType;
}
export declare const OtpSchema: import("mongoose").Schema<Otp, import("mongoose").Model<Otp, any, any, any, import("mongoose").Document<unknown, any, Otp, any> & Otp & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Otp, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Otp>, {}> & import("mongoose").FlatRecord<Otp> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
