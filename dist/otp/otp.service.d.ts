import { Model } from 'mongoose';
import { OtpDocument } from './otp.schema';
import { IOtpType } from './dto/otp.interface';
export declare class OtpService {
    private readonly otpModel;
    constructor(otpModel: Model<OtpDocument>);
    generateOtp(email: string, type: IOtpType): Promise<string>;
    validateOtp(email: string, type: IOtpType, otpCode?: string): Promise<string>;
    removeOtp(email: string): Promise<void>;
}
