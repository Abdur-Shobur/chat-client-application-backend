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
        return this.messageModel.findById(message._id).populate([
            { path: 'sender', select: 'name email phone' },
            {
                path: 'replyTo',
                select: 'text type sender',
                populate: { path: 'sender', select: 'name' },
            },
            { path: 'replyToUser', select: 'name' },
        ]);
    }
    findAll() {
        return this.messageModel.find().sort({ createdAt: -1 }).exec();
    }
    async getMyInboxList(userId) {
        const userObjectId = new mongoose_2.Types.ObjectId(userId);
        const personalChats = await this.messageModel.aggregate([
            {
                $match: {
                    chatType: 'personal',
                    $or: [{ sender: userObjectId }, { receiver: userObjectId }],
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
                                if: { $lt: ['$sender', '$receiver'] },
                                then: ['$sender', '$receiver'],
                                else: ['$receiver', '$sender'],
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
                            { $eq: ['$lastMessage.sender', userObjectId] },
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
                $project: {
                    chatType: '$lastMessage.chatType',
                    lastMessage: {
                        text: '$lastMessage.text',
                        type: '$lastMessage.type',
                        createdAt: '$lastMessage.createdAt',
                    },
                    userInfo: {
                        $let: {
                            vars: { user: { $arrayElemAt: ['$userInfo', 0] } },
                            in: {
                                _id: '$$user._id',
                                name: '$$user.name',
                                email: '$$user.email',
                                phone: '$$user.phone',
                                role: '$$user.role',
                                status: '$$user.status',
                            },
                        },
                    },
                    groupInfo: null,
                    participants: '$_id.participants',
                },
            },
        ]);
        const groupChats = await this.groupModel.aggregate([
            {
                $match: { members: userObjectId },
            },
            {
                $lookup: {
                    from: 'messages',
                    let: { groupId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$receiver', '$$groupId'] },
                                        { $eq: ['$chatType', 'group'] },
                                    ],
                                },
                            },
                        },
                        { $sort: { createdAt: -1 } },
                        { $limit: 1 },
                    ],
                    as: 'lastMessage',
                },
            },
            {
                $addFields: {
                    lastMessage: { $arrayElemAt: ['$lastMessage', 0] },
                },
            },
            {
                $project: {
                    chatType: { $literal: 'group' },
                    lastMessage: {
                        text: '$lastMessage.text',
                        type: '$lastMessage.type',
                        createdAt: '$lastMessage.createdAt',
                    },
                    userInfo: null,
                    groupInfo: {
                        _id: '$_id',
                        name: '$name',
                        description: '$description',
                        members: '$members',
                    },
                    participants: '$members',
                },
            },
        ]);
        const combinedChats = [...personalChats, ...groupChats];
        combinedChats.sort((a, b) => {
            const dateA = a.lastMessage?.createdAt
                ? new Date(a.lastMessage.createdAt).getTime()
                : 0;
            const dateB = b.lastMessage?.createdAt
                ? new Date(b.lastMessage.createdAt).getTime()
                : 0;
            return dateB - dateA;
        });
        return combinedChats;
    }
    async getChatMessages(chatType, userId, targetId) {
        const userObjectId = new mongoose_2.Types.ObjectId(userId);
        const targetObjectId = new mongoose_2.Types.ObjectId(targetId);
        const matchQuery = chatType === 'personal'
            ? {
                chatType: 'personal',
                $and: [
                    {
                        $or: [
                            { sender: userObjectId, receiver: targetObjectId },
                            { sender: targetObjectId, receiver: userObjectId },
                        ],
                    },
                    {
                        $or: [{ sender: userObjectId }, { visibility: 'public' }],
                    },
                ],
            }
            : {
                chatType: 'group',
                receiver: targetObjectId,
                $or: [
                    { sender: userObjectId },
                    {
                        $and: [
                            { visibility: 'public' },
                            {
                                $or: [
                                    { replyToUser: { $exists: false } },
                                    { replyToUser: null },
                                ],
                            },
                        ],
                    },
                    {
                        $and: [
                            { visibility: 'private' },
                            { replyToUser: userObjectId },
                        ],
                    },
                ],
            };
        const messages = await this.messageModel
            .find(matchQuery)
            .sort({ createdAt: -1 })
            .populate([
            {
                path: 'sender',
                select: 'name role phone',
                populate: {
                    path: 'role',
                    select: 'name type',
                },
            },
            {
                path: 'replyTo',
                populate: {
                    path: 'sender',
                    select: 'name phone',
                },
                select: 'text type sender',
            },
            {
                path: 'replyToUser',
                select: 'name phone',
            },
        ])
            .limit(20)
            .exec();
        return messages.reverse();
    }
    async getChatMessagesForAdmin(chatType, userId, targetId) {
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
        const messages = await this.messageModel
            .find(matchQuery)
            .sort({ createdAt: -1 })
            .populate([
            {
                path: 'sender',
                select: 'name role phone',
                populate: {
                    path: 'role',
                    select: 'name type',
                },
            },
            {
                path: 'replyTo',
                populate: {
                    path: 'sender',
                    select: 'name phone',
                },
                select: 'text type sender',
            },
            {
                path: 'replyToUser',
                select: 'name',
            },
        ])
            .limit(20)
            .exec();
        return messages.reverse();
    }
    findByChat(receiverId) {
        return this.messageModel.find({ receiver: receiverId }).exec();
    }
    async toggleVisibility(messageId) {
        const message = await this.messageModel.findById(messageId);
        message.visibility = message.visibility === 'public' ? 'private' : 'public';
        await message.save();
        return message;
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