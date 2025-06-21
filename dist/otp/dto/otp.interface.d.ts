export interface IOtp {
    email?: string;
    expiresAt: Date;
    otpCode: string;
    type: IOtpType;
    status?: IOtpStatus;
    _id?: string;
}
export declare enum IOtpStatus {
    Active = "new",
    Inactive = "used",
    Deleted = "deleted"
}
export declare enum IOtpType {
    ForgetPassword = "forgetPassword",
    VerifyEmail = "verifyEmail"
}
