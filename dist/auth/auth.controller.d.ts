import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CustomConfigService } from 'src/config';
import { OtpService } from 'src/otp/otp.service';
import { EmailService } from 'src/email/email.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { IUserStatus } from 'src/user/interfaces/user.interfaces';
import { VerifyOtpDto } from 'src/otp/dto/verify-otp.dto';
import { IOtpType } from 'src/otp/dto/otp.interface';
import { GlobalSettingService } from 'src/global-setting/global-setting.service';
import { RoleService } from 'src/role/role.service';
import { LoginUserDto } from './auth.login.dto';
import { IRoleType } from 'src/role/interfaces/role.interfaces';
export declare class AuthController {
    private readonly authService;
    private readonly roleService;
    private readonly userService;
    private readonly jwtService;
    private readonly config;
    private readonly otpService;
    private readonly emailService;
    private readonly GlobalSettingService;
    constructor(authService: AuthService, roleService: RoleService, userService: UserService, jwtService: JwtService, config: CustomConfigService, otpService: OtpService, emailService: EmailService, GlobalSettingService: GlobalSettingService);
    create(createUserDto: CreateUserDto): Promise<import("src/type").IApiResponse<{
        user: {
            email: string;
            name: string;
            phone: string;
            status: IUserStatus;
            role: IRoleType;
            id: import("mongoose").Types.ObjectId;
        };
        accessToken: string;
    }>>;
    info(req: any): Promise<import("src/type").IApiResponse<any>>;
    resendOtp(req: {
        email: string;
        type: IOtpType;
    }): Promise<import("src/type").IApiResponse<string>>;
    verifyOtp(otpData: VerifyOtpDto): Promise<import("src/type").IApiResponse<any>>;
    login(loginDto: LoginUserDto): Promise<import("src/type").IApiResponse<{
        user: {
            email: string;
            name: string;
            phone: string;
            status: IUserStatus.Active;
            role: IRoleType;
            id: import("mongoose").Types.ObjectId;
        };
        accessToken: string;
    }>>;
    requestPasswordReset(email: string): Promise<import("src/type").IApiResponse<string>>;
    verifyResetOtp(otpData: {
        email: string;
        otp: string;
    }): Promise<import("src/type").IApiResponse<string>>;
    resetPassword(resetDto: {
        email: string;
        otp: string;
        newPassword: string;
    }): Promise<import("src/type").IApiResponse<string>>;
}
