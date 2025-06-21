import { Module } from '@nestjs/common';
import { SiteSettingService } from './site-setting.service';
import { SiteSettingController } from './site-setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SiteSetting, SiteSettingSchema } from './schemas/site-setting.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SiteSetting.name, schema: SiteSettingSchema },
    ]),
  ],
  controllers: [SiteSettingController],
  providers: [SiteSettingService],
})
export class SiteSettingModule {}
