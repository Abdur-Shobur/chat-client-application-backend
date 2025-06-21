"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOtpType = exports.IOtpStatus = void 0;
var IOtpStatus;
(function (IOtpStatus) {
    IOtpStatus["Active"] = "new";
    IOtpStatus["Inactive"] = "used";
    IOtpStatus["Deleted"] = "deleted";
})(IOtpStatus || (exports.IOtpStatus = IOtpStatus = {}));
var IOtpType;
(function (IOtpType) {
    IOtpType["ForgetPassword"] = "forgetPassword";
    IOtpType["VerifyEmail"] = "verifyEmail";
})(IOtpType || (exports.IOtpType = IOtpType = {}));
//# sourceMappingURL=otp.interface.js.map