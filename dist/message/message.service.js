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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const group_schema_1 = require("../group/schemas/group.schema");
let MessageService = class MessageService {
    constructor(messageModel, groupModel) {
        this.messageModel = messageModel;
        this.groupModel = groupModel;
    }
    async create(createMessageDto) {
        const message = await this.messageModel.create(createMessageDto);
        return this.messageModel
            .findById(message._id)
            .populate('sender', 'name email phone');
    }
    findAll() {
        return this.messageModel.find().sort({ createdAt: -1 }).exec();
    }
    async getMyInboxList(userId) {
        return this.messageModel.aggregate([
            {
                $match: {
                    $or: [
                        { sender: new mongoose_2.Types.ObjectId(userId) },
                        { receiver: new mongoose_2.Types.ObjectId(userId) },
                    ],
                },
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $group: {
                    _id: {
                        chatType: '$chatType',
                        participants: {
                            $cond: {
                                if: { $eq: ['$chatType', 'personal'] },
                                then: {
                                    $cond: {
                                        if: { $lt: ['$sender', '$receiver'] },
                                        then: ['$sender', '$receiver'],
                                        else: ['$receiver', '$sender'],
                                    },
                                },
                                else: ['$receiver'],
                            },
                        },
                    },
                    lastMessage: { $first: '$$ROOT' },
                },
            },
            {
                $addFields: {
                    otherParticipant: {
                        $cond: [
                            { $eq: ['$lastMessage.sender', new mongoose_2.Types.ObjectId(userId)] },
                            '$lastMessage.receiver',
                            '$lastMessage.sender',
                        ],
                    },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'otherParticipant',
                    foreignField: '_id',
                    as: 'userInfo',
                },
            },
            {
                $lookup: {
                    from: 'groups',
                    localField: 'lastMessage.receiver',
                    foreignField: '_id',
                    as: 'groupInfo',
                },
            },
            {
                $project: {
                    chatType: '$lastMessage.chatType',
                    lastMessage: {
                        text: '$lastMessage.text',
                        type: '$lastMessage.type',
                        createdAt: '$lastMessage.createdAt',
                    },
                    userInfo: { $arrayElemAt: ['$userInfo', 0] },
                    groupInfo: { $arrayElemAt: ['$groupInfo', 0] },
                    participants: '$_id.participants',
                },
            },
            {
                $sort: { 'lastMessage.createdAt': -1 },
            },
        ]);
    }
    async getChatMessagesForAdmin(chatType, userId, targetId) {
        const matchQuery = chatType === 'personal'
            ? {
                chatType: 'personal',
                $and: [
                    {
                        $or: [
                            {
                                sender: new mongoose_2.Types.ObjectId(userId),
                                receiver: new mongoose_2.Types.ObjectId(targetId),
                            },
                            {
                                sender: new mongoose_2.Types.ObjectId(targetId),
                                receiver: new mongoose_2.Types.ObjectId(userId),
                            },
                        ],
                    },
                    {
                        $or: [
                            { sender: new mongoose_2.Types.ObjectId(userId) },
                            { visibility: 'public' },
                        ],
                    },
                ],
            }
            : {
                chatType: 'group',
                receiver: new mongoose_2.Types.ObjectId(targetId),
                $or: [
                    { sender: new mongoose_2.Types.ObjectId(userId) },
                    { visibility: 'public' },
                ],
            };
        return this.messageModel
            .find(matchQuery)
            .sort({ createdAt: 1 })
            .populate('sender', 'name avatar')
            .exec();
    }
    async getChatMessages(chatType, userId, targetId) {
        const matchQuery = chatType === 'personal'
            ? {
                chatType: 'personal',
                $or: [
                    {
                        sender: new mongoose_2.Types.ObjectId(userId),
                        receiver: new mongoose_2.Types.ObjectId(targetId),
                    },
                    {
                        sender: new mongoose_2.Types.ObjectId(targetId),
                        receiver: new mongoose_2.Types.ObjectId(userId),
                    },
                ],
            }
            : {
                chatType: 'group',
                receiver: new mongoose_2.Types.ObjectId(targetId),
            };
        return this.messageModel
            .find(matchQuery)
            .sort({ createdAt: 1 })
            .populate('sender', 'name avatar')
            .exec();
    }
    findByChat(receiverId) {
        return this.messageModel.find({ receiver: receiverId }).exec();
    }
    findOne(id) {
        return this.messageModel.findById(id).exec();
    }
    update(id, updateMessageDto) {
        return this.messageModel.findByIdAndUpdate(id, updateMessageDto, {
            new: true,
        });
    }
    remove(id) {
        return this.messageModel.findByIdAndDelete(id);
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Message')),
    __param(1, (0, mongoose_1.InjectModel)(group_schema_1.Group.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MessageService);
//# sourceMappingURL=message.service.js.map