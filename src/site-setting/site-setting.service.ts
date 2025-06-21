import { Injectable } from '@nestjs/common';
import { CreateSiteSettingDto } from './dto/create-site-setting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SiteSetting } from './schemas/site-setting.schema';
import { Model } from 'mongoose';
import { FileUtils } from 'src/upload/file-utils';

@Injectable()
export class SiteSettingService {
  constructor(
    @InjectModel(SiteSetting.name) private siteSettingModel: Model<SiteSetting>,
  ) {}

  async create(
    createSiteSettingDto: CreateSiteSettingDto,
  ): Promise<SiteSetting> {
    const existingRecord = await this.siteSettingModel.findOne();

    if (existingRecord) {
      // Remove old images if new ones are uploaded
      if (createSiteSettingDto.logo && existingRecord.logo) {
        FileUtils.deleteFile(existingRecord.logo);
      }
      if (createSiteSettingDto.favicon && existingRecord.favicon) {
        FileUtils.deleteFile(existingRecord.favicon);
      }

      // Update existing record
      Object.assign(existingRecord, createSiteSettingDto);
      return existingRecord.save();
    }

    // Create a new record if none exists
    const newRecord = new this.siteSettingModel(createSiteSettingDto);
    return newRecord.save();
  }

  async findAll() {
    return this.siteSettingModel.findOne().lean().exec();
  }
}
