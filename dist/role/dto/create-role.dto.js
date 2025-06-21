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
exports.CreateRoleDto = void 0;
const class_validator_1 = require("class-validator");
const role_interfaces_1 = require("../interfaces/role.interfaces");
const swagger_1 = require("@nestjs/swagger");
class CreateRoleDto {
    constructor() {
        this.type = role_interfaces_1.IRoleType.User;
    }
}
exports.CreateRoleDto = CreateRoleDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, { message: 'Name must be at least 2 characters long' }),
    (0, class_validator_1.MaxLength)(120, { message: 'Name must be at most 120 characters long' }),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(role_interfaces_1.IRoleType, {
        message: '{VALUE} is not a valid type',
    }),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)({ message: 'Permissions is required' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Minimum 1 permission is required' }),
    (0, class_validator_1.ArrayMaxSize)(500, {
        message: 'Maximum 500 permissions are allowed',
    }),
    __metadata("design:type", Array)
], CreateRoleDto.prototype, "permissions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(120, {
        message: 'description must be at most 120 characters long',
    }),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(role_interfaces_1.IRoleStatus, {
        message: '{VALUE} is not a valid status',
    }),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "status", void 0);
//# sourceMappingURL=create-role.dto.js.map