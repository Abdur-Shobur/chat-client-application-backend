import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomConfigService } from './config.service';
import { MongooseModule } from '@nestjs/mongoose';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'), // Dynamically fetch the DB URL
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
  ],
  providers: [CustomConfigService],
  exports: [CustomConfigService],
})
export class CustomConfigModule {}
