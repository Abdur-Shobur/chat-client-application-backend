import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as crypto from 'crypto';
import { Otp, OtpDocument } from './otp.schema';
import { IOtpStatus, IOtpType } from './dto/otp.interface';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp.name) private readonly otpModel: Model<OtpDocument>,
  ) {}

  async generateOtp(email: string, type: IOtpType): Promise<string> {
    const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP

    // Save OTP with expiration (10 minutes)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await new this.otpModel({
      otpCode: otp,
      expiresAt,
      email: email,
      status: IOtpStatus.Active,
      type,
    }).save();

    return otp;
  }

  async validateOtp(
    email: string,
    type: IOtpType,
    otpCode?: string,
  ): Promise<string> {
    const otp = await this.otpModel.findOne({
      email,
      otpCode,
      type,
      status: IOtpStatus.Active,
    });

    if (!otp) {
      return 'Invalid OTP'; // Invalid or expired
    }
    if (otp.expiresAt < new Date()) {
      return 'OTP expired'; // Invalid or expired
    }

    this.otpModel.updateOne(
      { _id: new Types.ObjectId(otp._id) },
      { status: IOtpStatus.Inactive },
    );

    return 'OTP verified successfully';
  }

  async removeOtp(email: string): Promise<void> {
    await this.otpModel.deleteOne({ email });
  }
}
