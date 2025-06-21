import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule for configuration
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Dynamically fetch the secret from .env
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRE') }, // Adjust expiration as needed
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
  ],
  exports: [JwtModule],
})
export class JwtGlobalModule {}
