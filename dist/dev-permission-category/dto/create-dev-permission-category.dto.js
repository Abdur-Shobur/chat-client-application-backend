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
exports.CreateDevPermissionCategoryDto = void 0;
const class_validator_1 = require("class-validator");
const dev_permission_category_interfaces_1 = require("../interfaces/dev-permission-category.interfaces");
const swagger_1 = require("@nestjs/swagger");
class CreateDevPermissionCategoryDto {
}
exports.CreateDevPermissionCategoryDto = CreateDevPermissionCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: 'Name of the category' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: 'Name must be at least 2 characters long' }),
    (0, class_validator_1.MaxLength)(120, { message: 'Name must be at most 120 characters long' }),
    __metadata("design:type", String)
], CreateDevPermissionCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: 'Permission Key' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, {
        message: 'permission Key must be at least 2 characters long',
    }),
    (0, class_validator_1.MaxLength)(120, {
        message: 'permission Key must be at most 120 characters long',
    }),
    __metadata("design:type", String)
], CreateDevPermissionCategoryDto.prototype, "permissionKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: 'Description of the category' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(2, { message: 'description must be at least 2 characters long' }),
    (0, class_validator_1.MaxLength)(120, {
        message: 'description must be at most 120 characters long',
    }),
    __metadata("design:type", String)
], CreateDevPermissionCategoryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Status of the category is active or inactive or deleted',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(dev_permission_category_interfaces_1.IDevPermissionCategoryStatus, {
        message: '{VALUE} is not a valid status',
    }),
    __metadata("design:type", String)
], CreateDevPermissionCategoryDto.prototype, "status", void 0);
//# sourceMappingURL=create-dev-permission-category.dto.js.map