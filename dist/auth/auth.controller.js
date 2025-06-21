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
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../config");
const otp_service_1 = require("../otp/otp.service");
const email_service_1 = require("../email/email.service");
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const bcrypt = require("bcrypt");
const user_interfaces_1 = require("../user/interfaces/user.interfaces");
const helper_1 = require("../helper");
const verify_otp_dto_1 = require("../otp/dto/verify-otp.dto");
const otp_interface_1 = require("../otp/dto/otp.interface");
const auth_guard_1 = require("../helper/auth-guard");
const decorator_1 = require("../role/decorator");
const global_setting_service_1 = require("../global-setting/global-setting.service");
const role_service_1 = require("../role/role.service");
const auth_login_dto_1 = require("./auth.login.dto");
const role_interfaces_1 = require("../role/interfaces/role.interfaces");
let AuthController = class AuthController {
    constructor(authService, roleService, userService, jwtService, config, otpService, emailService, GlobalSettingService) {
        this.authService = authService;
        this.roleService = roleService;
        this.userService = userService;
        this.jwtService = jwtService;
        this.config = config;
        this.otpService = otpService;
        this.emailService = emailService;
        this.GlobalSettingService = GlobalSettingService;
    }
    async create(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, Number(this.config.hashSalt));
        const globalSetting = await this.GlobalSettingService.getDefaultRole();
        const defaultRole = globalSetting?.default_user_role || '';
        const data = await this.userService.create({
            ...createUserDto,
            status: user_interfaces_1.IUserStatus.Active,
            password: hashedPassword,
            role: defaultRole,
        });
        const payload = {
            username: data.name,
            _id: data._id,
            role: role_interfaces_1.IRoleType.User,
        };
        const accessToken = this.jwtService.sign(payload);
        delete data.password;
        data.role = role_interfaces_1.IRoleType.User;
        return helper_1.ResponseHelper.success({
            user: {
                email: data.email,
                name: data.name,
                phone: data.phone,
                status: data.status,
                role: role_interfaces_1.IRoleType.User,
                id: data._id,
            },
            accessToken,
        }, 'User Register successfully');
    }
    async info(req) {
        return helper_1.ResponseHelper.success(req.user);
    }
    async resendOtp(req) {
        const otp = await this.otpService.generateOtp(req.email, req.type);
        await this.emailService.sendOtp(req.email, otp);
        return helper_1.ResponseHelper.success('OTP sent successfully');
    }
    async verifyOtp(otpData) {
        const isValid = await this.otpService.validateOtp(otpData.email, otp_interface_1.IOtpType.VerifyEmail, otpData.otp);
        if (isValid === 'OTP verified successfully') {
            await this.userService.updateByEmail(otpData.email, {
                status: user_interfaces_1.IUserStatus.Active,
            });
            this.otpService.removeOtp(otpData.email);
            return helper_1.ResponseHelper.success(null, 'OTP verified successfully');
        }
        throw new common_1.HttpException(helper_1.ResponseHelper.error(isValid), common_1.HttpStatus.NOT_FOUND);
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const user = isEmail
            ? await this.userService.findByEmail(email)
            : await this.userService.findByPhone(email);
        if (!user) {
            throw new common_1.HttpException(helper_1.ResponseHelper.error('Credentials does not match', common_1.HttpStatus.NOT_FOUND), common_1.HttpStatus.NOT_FOUND);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException(helper_1.ResponseHelper.error('Invalid Credentials', common_1.HttpStatus.NOT_FOUND), common_1.HttpStatus.NOT_FOUND);
        }
        if (user.status !== user_interfaces_1.IUserStatus.Active) {
            throw new common_1.HttpException(helper_1.ResponseHelper.error('Your account is not active', common_1.HttpStatus.NOT_FOUND), common_1.HttpStatus.NOT_FOUND);
        }
        const role = await this.roleService.findOne(user.role);
        const payload = { username: user.name, _id: user._id, role: role.type };
        const accessToken = this.jwtService.sign(payload);
        delete user.password;
        const { email: _email, name, phone, status } = user;
        return helper_1.ResponseHelper.success({
            user: {
                email: _email,
                name,
                phone,
                status,
                role: role.type,
                id: user._id,
            },
            accessToken,
        }, 'Login successful');
    }
    async requestPasswordReset(email) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.HttpException(helper_1.ResponseHelper.error('Credentials does not match', common_1.HttpStatus.NOT_FOUND), common_1.HttpStatus.NOT_FOUND);
        }
        const otp = await this.otpService.generateOtp(user.email, otp_interface_1.IOtpType.ForgetPassword);
        await this.emailService.sendOtp(user.email, otp);
        return helper_1.ResponseHelper.success('OTP sent successfully');
    }
    async verifyResetOtp(otpData) {
        const isValid = await this.otpService.validateOtp(otpData.email, otp_interface_1.IOtpType.ForgetPassword, otpData.otp);
        if (isValid === 'OTP verified successfully') {
            return helper_1.ResponseHelper.success('OTP verified successfully');
        }
        throw new common_1.HttpException(helper_1.ResponseHelper.error(isValid), common_1.HttpStatus.NOT_FOUND);
    }
    async resetPassword(resetDto) {
        const { email, otp, newPassword } = resetDto;
        const isValid = await this.otpService.validateOtp(email, otp_interface_1.IOtpType.ForgetPassword, otp);
        if (isValid !== 'OTP verified successfully') {
            throw new common_1.HttpException(helper_1.ResponseHelper.error(isValid), common_1.HttpStatus.NOT_FOUND);
        }
        this.otpService.removeOtp(email);
        const hashedPassword = await bcrypt.hash(newPassword, Number(this.config.hashSalt));
        const res = await this.userService.updateByEmail(email, {
            password: hashedPassword,
        });
        return helper_1.ResponseHelper.success('Password reset successfully');
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, decorator_1.Roles)(decorator_1.Role.AUTH_REGISTER),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('info'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "info", null);
__decorate([
    (0, common_1.Post)('/resend-otp'),
    (0, decorator_1.Roles)(decorator_1.Role.AUTH_VERIFY_OTP),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendOtp", null);
__decorate([
    (0, common_1.Post)('/verify-otp'),
    (0, decorator_1.Roles)(decorator_1.Role.AUTH_VERIFY_OTP),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_otp_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, decorator_1.Roles)(decorator_1.Role.AUTH_LOGIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_login_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/request-password-reset'),
    (0, decorator_1.Roles)(decorator_1.Role.AUTH_REQUEST_FOR_RESET_PASSWORD),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestPasswordReset", null);
__decorate([
    (0, common_1.Post)('/verify-reset-otp'),
    (0, decorator_1.Roles)(decorator_1.Role.AUTH_RESET_PASSWORD_OTP),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyResetOtp", null);
__decorate([
    (0, common_1.Post)('/reset-password'),
    (0, decorator_1.Roles)(decorator_1.Role.AUTH_RESET_PASSWORD),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        role_service_1.RoleService,
        user_service_1.UserService,
        jwt_1.JwtService,
        config_1.CustomConfigService,
        otp_service_1.OtpService,
        email_service_1.EmailService,
        global_setting_service_1.GlobalSettingService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map