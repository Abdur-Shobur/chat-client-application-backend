import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { OtpModule } from 'src/otp/otp.module';
import { EmailService } from 'src/email/email.service';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [OtpModule, UserModule, RoleModule],
  controllers: [AuthController],
  providers: [AuthService, EmailService],
})
export class AuthModule {}
