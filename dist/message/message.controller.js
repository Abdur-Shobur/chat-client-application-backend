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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message.service");
const update_message_dto_1 = require("./dto/update-message.dto");
const auth_guard_1 = require("../helper/auth-guard");
const helper_1 = require("../helper");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    findAll() {
        return this.messageService.findAll();
    }
    async findAllChat(req) {
        const result = await this.messageService.getMyInboxList(req.user._id);
        if (!result)
            return helper_1.ResponseHelper.error('Chats not found');
        return helper_1.ResponseHelper.success(result);
    }
    getChatMessages(req, chatType, targetId) {
        if (req?.user?.role === 'admin') {
            return this.messageService.getChatMessagesForAdmin(chatType, req.user._id, targetId);
        }
        else {
            return this.messageService.getChatMessages(chatType, req.user._id, targetId);
        }
    }
    findByChat(receiverId) {
        return this.messageService.findByChat(receiverId);
    }
    findOne(id) {
        return this.messageService.findOne(id);
    }
    update(id, dto) {
        return this.messageService.update(id, dto);
    }
    remove(id) {
        return this.messageService.remove(id);
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('chat'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findAllChat", null);
__decorate([
    (0, common_1.Get)('chat-messages/:chatType/:targetId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('chatType')),
    __param(2, (0, common_1.Param)('targetId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "getChatMessages", null);
__decorate([
    (0, common_1.Get)('chat/:receiverId'),
    __param(0, (0, common_1.Param)('receiverId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "findByChat", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_message_dto_1.UpdateMessageDto]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "remove", null);
exports.MessageController = MessageController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
//# sourceMappingURL=message.controller.js.map