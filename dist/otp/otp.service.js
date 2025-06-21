"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const crypto = require("crypto");
const otp_schema_1 = require("./otp.schema");
const otp_interface_1 = require("./dto/otp.interface");
let OtpService = class OtpService {
    constructor(otpModel) {
        this.otpModel = otpModel;
    }
    async generateOtp(email, type) {
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await new this.otpModel({
            otpCode: otp,
            expiresAt,
            email: email,
            status: otp_interface_1.IOtpStatus.Active,
            type,
        }).save();
        return otp;
    }
    async validateOtp(email, type, otpCode) {
        const otp = await this.otpModel.findOne({
            email,
            otpCode,
            type,
            status: otp_interface_1.IOtpStatus.Active,
        });
        if (!otp) {
            return 'Invalid OTP';
        }
        if (otp.expiresAt < new Date()) {
            return 'OTP expired';
        }
        this.otpModel.updateOne({ _id: new mongoose_2.Types.ObjectId(otp._id) }, { status: otp_interface_1.IOtpStatus.Inactive });
        return 'OTP verified successfully';
    }
    async removeOtp(email) {
        await this.otpModel.deleteOne({ email });
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(otp_schema_1.Otp.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OtpService);
//# sourceMappingURL=otp.service.js.map