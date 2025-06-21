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
exports.CreateGroupDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const group_interfaces_1 = require("../interfaces/group.interfaces");
class CreateGroupDto {
}
exports.CreateGroupDto = CreateGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Test Group' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Description' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/icon.png' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "iconUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '67b2c9fc32c98e2ba9cce8d2' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['public', 'private'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['public', 'private']),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "joinType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/join' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "joinLink", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['auto', 'admin'], example: 'auto' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['auto', 'admin']),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "joinApprovalType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Welcome to the group!' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "welcomeMessage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ['user1', 'user2'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateGroupDto.prototype, "members", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ['pending 1', 'pending 2'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateGroupDto.prototype, "pendingMembers", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ['tag 1', 'tag 2'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateGroupDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateGroupDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateGroupDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: group_interfaces_1.IGroupStatus.Active }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(group_interfaces_1.IGroupStatus, {
        message: '{VALUE} is not a valid status',
    }),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "status", void 0);
//# sourceMappingURL=create-group.dto.js.map