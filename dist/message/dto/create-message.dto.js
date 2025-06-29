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
exports.CreateMessageDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateMessageDto {
}
exports.CreateMessageDto = CreateMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the sender',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "sender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the receiver (user or group)',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "receiver", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of chat (personal or group)',
        enum: ['personal', 'group'],
    }),
    (0, class_validator_1.IsEnum)(['personal', 'group']),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "chatType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Text content of the message',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the image if the message is an image',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the file if the message is a file',
        required: false,
    }),
    (0, class_validator_1.IsEnum)(['text', 'image', 'file', 'video', 'audio']),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: 'private',
        description: 'Visibility of the message',
        enum: ['public', 'private'],
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "visibility", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the message being replied to',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "replyTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the user being replied to (in a group chat)',
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "replyToUser", void 0);
//# sourceMappingURL=create-message.dto.js.map