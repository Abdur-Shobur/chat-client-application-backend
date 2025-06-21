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
    }
    afterInit(server) {
        console.log('WebSocket Server Initialized');
        server.use((0, ws_auth_middleware_1.AuthWsMiddleware)(this.jwtService, this.configService, this.userService));
    }
    handleConnection(socket) {
        const user = socket.data.user;
        if (user) {
            this.connectedUsers.set(socket.id, user._id.toString());
            console.log(`Client connected: ${socket.id} (userId: ${user._id})`);
        }
        else {
            console.warn(`Unauthorized socket tried to connect: ${socket.id}`);
            socket.disconnect();
        }
    }
    handleDisconnect(socket) {
        const userId = this.connectedUsers.get(socket.id);
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
                if (userId === data.receiver) {
                    client.to(socketId).emit('receiveMessage', savedMessage);
                }
            }
        }
        else if (data.chatType === 'group') {
            console.log({ savedMessage });
            client.broadcast.emit('receiveMessage', savedMessage);
        }
        client.emit('messageSent', savedMessage);
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