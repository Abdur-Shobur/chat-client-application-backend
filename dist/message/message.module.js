"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const message_service_1 = require("./message.service");
const message_controller_1 = require("./message.controller");
const message_schema_1 = require("./schemas/message.schema");
const message_gateway_1 = require("./message.gateway");
const group_module_1 = require("../group/group.module");
const group_schema_1 = require("../group/schemas/group.schema");
const user_module_1 = require("../user/user.module");
let MessageModule = class MessageModule {
};
exports.MessageModule = MessageModule;
exports.MessageModule = MessageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Message', schema: message_schema_1.MessageSchema },
                { name: group_schema_1.Group.name, schema: group_schema_1.GroupSchema },
            ]),
            group_module_1.GroupModule,
            user_module_1.UserModule,
        ],
        controllers: [message_controller_1.MessageController],
        providers: [message_service_1.MessageService, message_gateway_1.MessageGateway],
        exports: [message_service_1.MessageService],
    })
], MessageModule);
//# sourceMappingURL=message.module.js.map