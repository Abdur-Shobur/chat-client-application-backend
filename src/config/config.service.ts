import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomConfigService {
  constructor(private readonly configService: ConfigService) {}

  get isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  get port(): number {
    return this.configService.get<number>('PORT');
  }

  get host(): string {
    return this.configService.get<string>('HOST');
  }

  get databaseUri(): string {
    return this.configService.get<string>('DATABASE_URL');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  get jwtExpiresIn(): string {
    return this.configService.get<string>('JWT_EXPIRE');
  }

  get hashSalt(): string {
    return this.configService.get<string>('HASH_SALT');
  }

  // Email Configuration
  get email(): string {
    return this.configService.get<string>('EMAIL_USER');
  }

  get emailPassword(): string {
    return this.configService.get<string>('EMAIL_PASSWORD');
  }

  get frontEndUrls(): string[] {
    const urls = this.configService.get<string>('FRONTEND_URL');
    return urls ? urls.split(',').map((url) => url.trim()) : [];
  }
}
