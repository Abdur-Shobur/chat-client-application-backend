import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CustomConfigService } from 'src/config';
import { OtpService } from 'src/otp/otp.service';
import { EmailService } from 'src/email/email.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { IUserStatus } from 'src/user/interfaces/user.interfaces';
import { ResponseHelper } from 'src/helper';
import { VerifyOtpDto } from 'src/otp/dto/verify-otp.dto';
import { IOtpType } from 'src/otp/dto/otp.interface';
import { AuthGuard } from 'src/helper/auth-guard';
import { Role, Roles } from 'src/role/decorator';
import { GlobalSettingService } from 'src/global-setting/global-setting.service';
import { RoleService } from 'src/role/role.service';
import { LoginUserDto } from './auth.login.dto';
import { RoleType } from 'src/type';
import { IRoleType } from 'src/role/interfaces/role.interfaces';

@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: CustomConfigService,
    private readonly otpService: OtpService,
    private readonly emailService: EmailService,
    private readonly GlobalSettingService: GlobalSettingService,
  ) {}

  @Post('register')
  @Roles(Role.AUTH_REGISTER)
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      Number(this.config.hashSalt),
    );

    // Fetch the default role from GlobalSettingService
    const globalSetting = await this.GlobalSettingService.getDefaultRole();
    const defaultRole = globalSetting?.default_user_role || '';

    const data = await this.userService.create({
      ...createUserDto,
      status: IUserStatus.Active,
      password: hashedPassword,
      role: defaultRole,
    });

    // Create the JWT payload
    const payload = {
      username: data.name,
      _id: data._id,
      role: IRoleType.User,
    };
    const accessToken = this.jwtService.sign(payload);

    // Generate OTP
    // const otp = await this.otpService.generateOtp(
    //   data.email,
    //   IOtpType.VerifyEmail,
    // );

    // Send OTP via email
    // await this.emailService.sendOtp(data.email, otp);

    // Remove password from the response
    delete data.password;
    data.role = IRoleType.User;
    return ResponseHelper.success(
      {
        user: {
          email: data.email,
          name: data.name,
          phone: data.phone,
          status: data.status,
          role: IRoleType.User,
          id: data._id,
        },
        accessToken,
      },
      'User Register successfully',
    );
  }

  @Get('info')
  async info(@Req() req: any) {
    return ResponseHelper.success(req.user);
  }

  @Post('/resend-otp')
  @Roles(Role.AUTH_VERIFY_OTP)
  async resendOtp(@Body() req: { email: string; type: IOtpType }) {
    const otp = await this.otpService.generateOtp(req.email, req.type);

    // Send OTP via email
    await this.emailService.sendOtp(req.email, otp);

    return ResponseHelper.success('OTP sent successfully');
  }

  // Verify OTP
  @Post('/verify-otp')
  @Roles(Role.AUTH_VERIFY_OTP)
  async verifyOtp(@Body() otpData: VerifyOtpDto) {
    const isValid = await this.otpService.validateOtp(
      otpData.email,
      IOtpType.VerifyEmail,
      otpData.otp,
    );

    if (isValid === 'OTP verified successfully') {
      await this.userService.updateByEmail(otpData.email, {
        status: IUserStatus.Active,
      });
      this.otpService.removeOtp(otpData.email);

      return ResponseHelper.success(null, 'OTP verified successfully');
    }

    throw new HttpException(
      ResponseHelper.error(isValid),
      HttpStatus.NOT_FOUND,
    );
  }

  @Post('/login')
  @Roles(Role.AUTH_LOGIN)
  async login(@Body() loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // Find the user by email or phone
    const user = isEmail
      ? await this.userService.findByEmail(email)
      : await this.userService.findByPhone(email);

    if (!user) {
      throw new HttpException(
        ResponseHelper.error(
          'Credentials does not match',
          HttpStatus.NOT_FOUND,
        ),
        HttpStatus.NOT_FOUND,
      );
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(
        ResponseHelper.error('Invalid Credentials', HttpStatus.NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }

    // Check if the user is active
    if (user.status !== IUserStatus.Active) {
      throw new HttpException(
        ResponseHelper.error(
          'Your account is not active',
          HttpStatus.NOT_FOUND,
        ),
        HttpStatus.NOT_FOUND,
      );
    }

    const role = await this.roleService.findOne(user.role);

    // Create the JWT payload
    const payload = { username: user.name, _id: user._id, role: role.type };
    const accessToken = this.jwtService.sign(payload);

    // Remove password from the response
    delete user.password;

    const { email: _email, name, phone, status } = user;

    return ResponseHelper.success(
      {
        user: {
          email: _email,
          name,
          phone,
          status,
          role: role.type,
          id: user._id,
        },
        accessToken,
      },
      'Login successful',
    );
  }
  // Request Password Reset with OTP
  @Post('/request-password-reset')
  @Roles(Role.AUTH_REQUEST_FOR_RESET_PASSWORD)
  async requestPasswordReset(@Body('email') email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException(
        ResponseHelper.error(
          'Credentials does not match',
          HttpStatus.NOT_FOUND,
        ),
        HttpStatus.NOT_FOUND,
      );
    }

    // Generate OTP
    const otp = await this.otpService.generateOtp(
      user.email,
      IOtpType.ForgetPassword,
    );

    // Send OTP via email
    await this.emailService.sendOtp(user.email, otp);

    return ResponseHelper.success('OTP sent successfully');
  }

  // Verify OTP
  @Post('/verify-reset-otp')
  @Roles(Role.AUTH_RESET_PASSWORD_OTP)
  async verifyResetOtp(@Body() otpData: { email: string; otp: string }) {
    const isValid = await this.otpService.validateOtp(
      otpData.email,
      IOtpType.ForgetPassword,
      otpData.otp,
    );

    if (isValid === 'OTP verified successfully') {
      return ResponseHelper.success('OTP verified successfully');
    }

    throw new HttpException(
      ResponseHelper.error(isValid),
      HttpStatus.NOT_FOUND,
    );
  }

  // Reset Password
  @Post('/reset-password')
  @Roles(Role.AUTH_RESET_PASSWORD)
  async resetPassword(
    @Body() resetDto: { email: string; otp: string; newPassword: string },
  ) {
    const { email, otp, newPassword } = resetDto;

    // Verify OTP
    const isValid = await this.otpService.validateOtp(
      email,
      IOtpType.ForgetPassword,
      otp,
    );
    if (isValid !== 'OTP verified successfully') {
      throw new HttpException(
        ResponseHelper.error(isValid),
        HttpStatus.NOT_FOUND,
      );
    }

    // Remove OTP
    this.otpService.removeOtp(email);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      Number(this.config.hashSalt),
    );

    // Update user's password
    const res = await this.userService.updateByEmail(email, {
      password: hashedPassword,
    });

    return ResponseHelper.success('Password reset successfully');
  }
}
