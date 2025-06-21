export interface IOtp {
  email?: string;
  expiresAt: Date;
  otpCode: string;
  type: IOtpType;
  status?: IOtpStatus;
  _id?: string;
}

// for menu status
export enum IOtpStatus {
  Active = 'new',
  Inactive = 'used',
  Deleted = 'deleted',
}
export enum IOtpType {
  ForgetPassword = 'forgetPassword',
  VerifyEmail = 'verifyEmail',
}
