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
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const upload_interceptor_1 = require("./upload.interceptor");
const auth_guard_1 = require("../helper/auth-guard");
const decorator_1 = require("../role/decorator");
let UploadController = class UploadController {
    async uploadSingleFile(file) {
        return {
            message: 'Single file uploaded successfully',
            file,
        };
    }
    async uploadMultipleFiles(files) {
        return {
            message: 'Multiple files uploaded successfully',
            files,
        };
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('single'),
    (0, decorator_1.Roles)(decorator_1.Role.SITE_SETTING_UPDATE),
    (0, common_1.UseInterceptors)((0, upload_interceptor_1.createUploadInterceptor)({
        fieldName: 'file',
        destination: './uploads/single',
        maxFileSize: 5 * 1024 * 1024,
        allowedMimeTypes: ['image/jpeg', 'image/png'],
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadSingleFile", null);
__decorate([
    (0, common_1.Post)('multiple'),
    (0, decorator_1.Roles)(decorator_1.Role.SITE_SETTING_UPDATE),
    (0, common_1.UseInterceptors)((0, upload_interceptor_1.createUploadInterceptor)({
        fieldName: 'files',
        destination: './uploads/multiple',
        maxFiles: 5,
        maxFileSize: 5 * 1024 * 1024,
        allowedMimeTypes: ['image/jpeg', 'image/png'],
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadMultipleFiles", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('upload')
], UploadController);
//# sourceMappingURL=upload.controller.js.map