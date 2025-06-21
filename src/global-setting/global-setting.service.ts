import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GlobalSetting } from './schemas/global-setting.schema';
import { CreateGlobalSettingDto } from './dto/create-global-setting.dto';

@Injectable()
export class GlobalSettingService {
  constructor(
    @InjectModel(GlobalSetting.name)
    private GlobalSettingModel: Model<GlobalSetting>,
  ) {}

  async create(
    createGlobalSettingDto: CreateGlobalSettingDto,
  ): Promise<GlobalSetting> {
    const existingRecord = await this.GlobalSettingModel.findOne();

    if (existingRecord) {
      // Update existing record
      Object.assign(existingRecord, createGlobalSettingDto);
      return existingRecord.save();
    }

    // Create a new record if none exists
    const newRecord = new this.GlobalSettingModel(createGlobalSettingDto);
    return newRecord.save();
  }

  async findAll() {
    return this.GlobalSettingModel.findOne().lean().exec();
  }

  async getDefaultRole() {
    return this.GlobalSettingModel.findOne().lean().exec();
  }
}
