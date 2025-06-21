"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteSettingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const site_setting_schema_1 = require("./schemas/site-setting.schema");
const mongoose_2 = require("mongoose");
const file_utils_1 = require("../upload/file-utils");
let SiteSettingService = class SiteSettingService {
    constructor(siteSettingModel) {
        this.siteSettingModel = siteSettingModel;
    }
    async create(createSiteSettingDto) {
        const existingRecord = await this.siteSettingModel.findOne();
        if (existingRecord) {
            if (createSiteSettingDto.logo && existingRecord.logo) {
                file_utils_1.FileUtils.deleteFile(existingRecord.logo);
            }
            if (createSiteSettingDto.favicon && existingRecord.favicon) {
                file_utils_1.FileUtils.deleteFile(existingRecord.favicon);
            }
            Object.assign(existingRecord, createSiteSettingDto);
            return existingRecord.save();
        }
        const newRecord = new this.siteSettingModel(createSiteSettingDto);
        return newRecord.save();
    }
    async findAll() {
        return this.siteSettingModel.findOne().lean().exec();
    }
};
exports.SiteSettingService = SiteSettingService;
exports.SiteSettingService = SiteSettingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(site_setting_schema_1.SiteSetting.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SiteSettingService);
//# sourceMappingURL=site-setting.service.js.map