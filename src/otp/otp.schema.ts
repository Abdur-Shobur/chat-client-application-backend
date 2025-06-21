// import { Schema } from 'mongoose';

// export const OtpSchema = new Schema({
//   userId: { type: String, required: true },
//   otpCode: { type: String, required: true },
//   expiresAt: { type: Date, required: true },
//   type: { type: String, required: true },
// });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IOtp, IOtpStatus, IOtpType } from './dto/otp.interface';

// Define the type for Otp document
export type OtpDocument = HydratedDocument<Otp>;

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class Otp implements IOtp {
  //   name
  @Prop({
    required: false,
    minlength: [2, 'name must be at least 2 characters long'],
    maxlength: [120, 'name must be at most 120 characters long'],
  })
  email: string;

  //   expiresAt
  @Prop({
    required: true,
    default: null,
    type: Date,
  })
  expiresAt: Date;

  //   otpCode
  @Prop({
    required: false,
    minlength: [2, 'otp Code must be at least 2 characters long'],
    maxlength: [10, 'otp Code must be at most 10 characters long'],
  })
  otpCode: string;

  // status
  @Prop({
    enum: {
      values: [IOtpStatus.Active, IOtpStatus.Inactive, IOtpStatus.Deleted],
      message: '{VALUE} is not a valid status',
    },
    default: IOtpStatus.Active,
  })
  status?: IOtpStatus;

  // type
  @Prop({
    enum: {
      values: [IOtpType.ForgetPassword, IOtpType.VerifyEmail],
      message: '{VALUE} is not a valid type',
    },
    default: null,
  })
  type: IOtpType;
}

// Create the schema
export const OtpSchema = SchemaFactory.createForClass(Otp);
