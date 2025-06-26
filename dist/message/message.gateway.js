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
exports.MessageGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const message_service_1 = require("./message.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const user_service_1 = require("../user/user.service");
const group_service_1 = require("../group/group.service");
const jwt_1 = require("@nestjs/jwt");
const ws_auth_middleware_1 = require("../helper/ws-auth.middleware");
const config_1 = require("../config");
let MessageGateway = class MessageGateway {
    constructor(messageService, userService, groupService, jwtService, configService) {
        this.messageService = messageService;
        this.userService = userService;
        this.groupService = groupService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.connectedUsers = new Map();
        this.connectedUsersDetailed = new Map();
    }
    afterInit(server) {
        this.server = server;
        this.configService.isDevelopment &&
            console.log('WebSocket Server Initialized');
        server.use((0, ws_auth_middleware_1.AuthWsMiddleware)(this.jwtService, this.configService, this.userService));
    }
    handleConnection(socket) {
        const user = socket.data.user;
        if (user) {
            for (const [sockId, userId] of this.connectedUsers.entries()) {
                if (userId === user._id.toString()) {
                    const existingSocket = this.server.sockets.sockets.get(sockId);
                    if (existingSocket && existingSocket.id !== socket.id) {
                        existingSocket.disconnect();
                    }
                }
            }
            this.connectedUsers.set(socket.id, user._id.toString());
            this.connectedUsersDetailed.set(socket.id, user);
            this.configService.isDevelopment &&
                console.log(`Client connected: ${socket.id} (userId: ${user._id})`);
        }
        else {
            console.warn(`Unauthorized socket tried to connect: ${socket.id}`);
            socket.disconnect();
        }
    }
    handleDisconnect(socket) {
        const userId = this.connectedUsers.get(socket.id);
        this.configService.isDevelopment &&
            console.log(`Client disconnected: ${socket.id} (userId: ${userId})`);
        this.connectedUsers.delete(socket.id);
    }
    async handleSendMessage(data, client) {
        const senderUser = client.data.user;
        if (!senderUser) {
            client.emit('unauthorized');
            return;
        }
        const savedMessage = await this.messageService.create({
            ...data,
            sender: senderUser._id,
        });
        if (data.chatType === 'personal') {
            for (const [socketId, userId] of this.connectedUsers.entries()) {
                const receiverId = savedMessage.receiver.toString();
                if (userId.toString() === receiverId) {
                    client.to(socketId).emit('receiveMessage', savedMessage);
                }
            }
        }
        else if (data.chatType === 'group') {
            const isSenderAdmin = senderUser.role?.type === 'admin';
            const groupMembers = await this.groupService.findOne(savedMessage.receiver.toString());
            const groupMem = groupMembers.members;
            for (const [socketId, user] of this.connectedUsersDetailed.entries()) {
                if (user._id === senderUser._id)
                    continue;
                const isUserAdmin = user.role?.type === 'admin';
                const isGroupMember = groupMem.some((member) => member._id.toString() === user._id.toString());
                if (!isGroupMember)
                    continue;
                const replyToUserId = typeof savedMessage.replyToUser === 'object' &&
                    savedMessage.replyToUser?._id?.toString();
                const isTargetUser = replyToUserId === user._id.toString();
                const isPublic = savedMessage.visibility === 'public';
                if (isSenderAdmin && isPublic) {
                    client.to(socketId).emit('receiveMessage', savedMessage);
                    continue;
                }
                if (isSenderAdmin && !isPublic) {
                    if (isUserAdmin || isTargetUser) {
                        client.to(socketId).emit('receiveMessage', savedMessage);
                    }
                    continue;
                }
                if (!isSenderAdmin && isPublic) {
                    client.to(socketId).emit('receiveMessage', savedMessage);
                    continue;
                }
                if (!isSenderAdmin && !isPublic) {
                    if (isUserAdmin || isTargetUser) {
                        client.to(socketId).emit('receiveMessage', savedMessage);
                    }
                    continue;
                }
            }
        }
        client.emit('messageSent', savedMessage);
    }
    async handleToggleVisibility(data, client) {
        const user = client.data.user;
        if (!user) {
            client.emit('unauthorized');
            return;
        }
        const updatedMessage = await this.messageService.toggleVisibility(data.messageId);
        if (!updatedMessage) {
            client.emit('error', { message: 'Message not found or update failed' });
            return;
        }
        this.server.emit('visibilityUpdated', {
            messageId: updatedMessage._id,
            visibility: updatedMessage.visibility,
        });
        client.emit('visibilityToggled', {
            messageId: updatedMessage._id,
            visibility: updatedMessage.visibility,
        });
    }
};
exports.MessageGateway = MessageGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('toggleVisibility'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "handleToggleVisibility", null);
exports.MessageGateway = MessageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
        transports: ['websocket'],
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService,
        user_service_1.UserService,
        group_service_1.GroupService,
        jwt_1.JwtService,
        config_1.CustomConfigService])
], MessageGateway);
//# sourceMappingURL=message.gateway.js.map