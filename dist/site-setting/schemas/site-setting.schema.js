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
exports.SiteSettingSchema = exports.SiteSetting = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
let SiteSetting = class SiteSetting {
};
exports.SiteSetting = SiteSetting;
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        minlength: [3, 'Site name must be at least 3 characters long'],
    }),
    __metadata("design:type", String)
], SiteSetting.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: null,
        maxlength: [255, 'Description must be at most 255 characters long'],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SiteSetting.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: null,
        maxlength: [255, 'Meta Title must be at most 255 characters long'],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SiteSetting.prototype, "metaTitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: null,
        maxlength: [255, 'Meta Description must be at most 255 characters long'],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SiteSetting.prototype, "metaDescription", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: null,
        maxlength: [255, 'Meta Keywords must be at most 255 characters long'],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SiteSetting.prototype, "metaKeywords", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: null,
        maxlength: [255, 'Meta Author must be at most 255 characters long'],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SiteSetting.prototype, "metaAuthor", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: null,
        maxlength: [255, 'Meta Copyright must be at most 255 characters long'],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SiteSetting.prototype, "metaCopyright", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: null,
        maxlength: [255, 'Logo URL must be at most 255 characters long'],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SiteSetting.prototype, "logo", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: null,
        maxlength: [255, 'Favicon URL must be at most 255 characters long'],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SiteSetting.prototype, "favicon", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: null,
        maxlength: [255, 'Footer Text must be at most 255 characters long'],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SiteSetting.prototype, "footerText", void 0);
exports.SiteSetting = SiteSetting = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], SiteSetting);
exports.SiteSettingSchema = mongoose_1.SchemaFactory.createForClass(SiteSetting);
//# sourceMappingURL=site-setting.schema.js.map