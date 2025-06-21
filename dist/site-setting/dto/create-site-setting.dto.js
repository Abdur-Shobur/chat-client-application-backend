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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSiteSettingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateSiteSettingDto {
}
exports.CreateSiteSettingDto = CreateSiteSettingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Site name',
        required: false,
        minLength: 3,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, { message: 'Site name must be at least 3 characters long' }),
    __metadata("design:type", String)
], CreateSiteSettingDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the site',
        required: false,
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, {
        message: 'Description must be at most 255 characters long',
    }),
    __metadata("design:type", String)
], CreateSiteSettingDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Meta title for SEO',
        required: false,
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, { message: 'Meta Title must be at most 255 characters long' }),
    __metadata("design:type", String)
], CreateSiteSettingDto.prototype, "metaTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Meta description for SEO',
        required: false,
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, {
        message: 'Meta Description must be at most 255 characters long',
    }),
    __metadata("design:type", String)
], CreateSiteSettingDto.prototype, "metaDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Meta keywords for SEO',
        required: false,
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, {
        message: 'Meta Keywords must be at most 255 characters long',
    }),
    __metadata("design:type", String)
], CreateSiteSettingDto.prototype, "metaKeywords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Meta author for SEO',
        required: false,
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, {
        message: 'Meta Author must be at most 255 characters long',
    }),
    __metadata("design:type", String)
], CreateSiteSettingDto.prototype, "metaAuthor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Meta copyright information',
        required: false,
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, {
        message: 'Meta Copyright must be at most 255 characters long',
    }),
    __metadata("design:type", String)
], CreateSiteSettingDto.prototype, "metaCopyright", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Logo URL',
        required: false,
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, { message: 'Logo URL must be at most 255 characters long' }),
    __metadata("design:type", String)
], CreateSiteSettingDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Favicon URL',
        required: false,
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, {
        message: 'Favicon URL must be at most 255 characters long',
    }),
    __metadata("design:type", String)
], CreateSiteSettingDto.prototype, "favicon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Footer text to display at the bottom of the page',
        required: false,
        maxLength: 255,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255, {
        message: 'Footer Text must be at most 255 characters long',
    }),
    __metadata("design:type", String)
], CreateSiteSettingDto.prototype, "footerText", void 0);
//# sourceMappingURL=create-site-setting.dto.js.map