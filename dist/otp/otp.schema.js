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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpSchema = exports.Otp = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const otp_interface_1 = require("./dto/otp.interface");
let Otp = class Otp {
};
exports.Otp = Otp;
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        minlength: [2, 'name must be at least 2 characters long'],
        maxlength: [120, 'name must be at most 120 characters long'],
    }),
    __metadata("design:type", String)
], Otp.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: null,
        type: Date,
    }),
    __metadata("design:type", Date)
], Otp.prototype, "expiresAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        minlength: [2, 'otp Code must be at least 2 characters long'],
        maxlength: [10, 'otp Code must be at most 10 characters long'],
    }),
    __metadata("design:type", String)
], Otp.prototype, "otpCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: {
            values: [otp_interface_1.IOtpStatus.Active, otp_interface_1.IOtpStatus.Inactive, otp_interface_1.IOtpStatus.Deleted],
            message: '{VALUE} is not a valid status',
        },
        default: otp_interface_1.IOtpStatus.Active,
    }),
    __metadata("design:type", String)
], Otp.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: {
            values: [otp_interface_1.IOtpType.ForgetPassword, otp_interface_1.IOtpType.VerifyEmail],
            message: '{VALUE} is not a valid type',
        },
        default: null,
    }),
    __metadata("design:type", String)
], Otp.prototype, "type", void 0);
exports.Otp = Otp = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Otp);
exports.OtpSchema = mongoose_1.SchemaFactory.createForClass(Otp);
//# sourceMappingURL=otp.schema.js.map