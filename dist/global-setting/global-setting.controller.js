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
exports.GlobalSettingController = void 0;
const common_1 = require("@nestjs/common");
const helper_1 = require("../helper");
const auth_guard_1 = require("../helper/auth-guard");
const decorator_1 = require("../role/decorator");
const global_setting_service_1 = require("./global-setting.service");
const create_global_setting_dto_1 = require("./dto/create-global-setting.dto");
let GlobalSettingController = class GlobalSettingController {
    constructor(GlobalSettingService) {
        this.GlobalSettingService = GlobalSettingService;
    }
    async create(createGlobalSettingDto) {
        const result = await this.GlobalSettingService.create(createGlobalSettingDto);
        if (!result) {
            return helper_1.ResponseHelper.error('Site Setting not created');
        }
        return helper_1.ResponseHelper.success(result, 'Site Setting created successfully');
    }
    async findAll() {
        const result = await this.GlobalSettingService.findAll();
        if (!result) {
            return helper_1.ResponseHelper.error('Data not found');
        }
        return helper_1.ResponseHelper.success(result);
    }
};
exports.GlobalSettingController = GlobalSettingController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_1.Roles)(decorator_1.Role.GLOBAL_SETTING_UPDATE),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_global_setting_dto_1.CreateGlobalSettingDto]),
    __metadata("design:returntype", Promise)
], GlobalSettingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_1.Roles)(decorator_1.Role.GLOBAL_SETTING_ALL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GlobalSettingController.prototype, "findAll", null);
exports.GlobalSettingController = GlobalSettingController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('global-setting'),
    __metadata("design:paramtypes", [global_setting_service_1.GlobalSettingService])
], GlobalSettingController);
//# sourceMappingURL=global-setting.controller.js.map