"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const otp_module_1 = require("../otp/otp.module");
const email_service_1 = require("../email/email.service");
const user_module_1 = require("../user/user.module");
const role_module_1 = require("../role/role.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [otp_module_1.OtpModule, user_module_1.UserModule, role_module_1.RoleModule],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, email_service_1.EmailService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map