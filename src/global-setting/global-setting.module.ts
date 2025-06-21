import { Global, Module } from '@nestjs/common';
import { GlobalSettingService } from './global-setting.service';
import { GlobalSettingController } from './global-setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  GlobalSetting,
  GlobalSettingSchema,
} from './schemas/global-setting.schema';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GlobalSetting.name, schema: GlobalSettingSchema },
    ]),
  ],

  controllers: [GlobalSettingController],
  providers: [GlobalSettingService],
  exports: [GlobalSettingService],
})
export class GlobalSettingModule {}
