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
exports.SiteSettingController = void 0;
const common_1 = require("@nestjs/common");
const site_setting_service_1 = require("./site-setting.service");
const upload_interceptor_different_name_1 = require("../upload/upload.interceptor-different-name");
const create_site_setting_dto_1 = require("./dto/create-site-setting.dto");
const helper_1 = require("../helper");
const auth_guard_1 = require("../helper/auth-guard");
const decorator_1 = require("../role/decorator");
let SiteSettingController = class SiteSettingController {
    constructor(siteSettingService) {
        this.siteSettingService = siteSettingService;
    }
    async create(files, createSiteSettingDto) {
        const logoFile = files['logo']?.[0];
        const faviconFile = files['favicon']?.[0];
        const logo = logoFile ? logoFile.path : null;
        const favicon = faviconFile ? faviconFile.path : null;
        const result = await this.siteSettingService.create({
            ...createSiteSettingDto,
            logo,
            favicon,
        });
        if (!result) {
            return helper_1.ResponseHelper.error('Site Setting not created');
        }
        return helper_1.ResponseHelper.success(result, 'Site Setting created successfully');
    }
    async findAll() {
        const result = await this.siteSettingService.findAll();
        if (!result) {
            return helper_1.ResponseHelper.error('Menu not found');
        }
        return helper_1.ResponseHelper.success(result);
    }
};
exports.SiteSettingController = SiteSettingController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_1.Roles)(decorator_1.Role.SITE_SETTING_UPDATE),
    (0, common_1.UseInterceptors)((0, upload_interceptor_different_name_1.createUploadInterceptorDifferentName)({
        fields: [
            { name: 'logo', maxCount: 1 },
            { name: 'favicon', maxCount: 1 },
        ],
        destination: './uploads/site-settings',
        maxFileSize: 5 * 1024 * 1024,
        allowedMimeTypes: ['image/jpeg', 'image/png'],
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_site_setting_dto_1.CreateSiteSettingDto]),
    __metadata("design:returntype", Promise)
], SiteSettingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_1.Roles)(decorator_1.Role.SITE_SETTING_ALL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SiteSettingController.prototype, "findAll", null);
exports.SiteSettingController = SiteSettingController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('site-setting'),
    __metadata("design:paramtypes", [site_setting_service_1.SiteSettingService])
], SiteSettingController);
//# sourceMappingURL=site-setting.controller.js.map