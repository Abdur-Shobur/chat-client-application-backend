import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { IMessage } from './interfaces/message.interface';
import { IGroup } from 'src/group/interfaces/group.interfaces';
import { IUser } from 'src/user/interfaces/user.interfaces';
import { Group } from 'src/group/schemas/group.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<IMessage>,
    @InjectModel(Group.name) private readonly groupModel: Model<IGroup>, // Replace 'any' with your Group interface
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const message = await this.messageModel.create(createMessageDto);
    return this.messageModel
      .findById(message._id)
      .populate('sender', 'name email phone');
  }

  // async create(createMessageDto: CreateMessageDto, senderUser: string) {
  //   const { chatType, receiver, ...rest } = createMessageDto;

  //   const messageData: any = {
  //     ...rest,
  //     sender: senderUser,
  //     receiver,
  //     chatType,
  //   };

  //   if (chatType === 'group') {
  //     const group = await this.groupModel.findById(receiver).lean();
  //     if (!group) throw new NotFoundException('Group not found');

  //     if (senderUser === group.createdBy.toString()) {
  //       // Admin: message is public
  //       messageData.visibility = 'public';
  //     } else {
  //       // User: message is private
  //       messageData.visibility = 'private';
  //     }
  //   }

  //   const message = await this.messageModel.create(messageData);

  //   // Only return populated result to sender (admin) if needed
  //   if (messageData.visibility === 'public') {
  //     return this.messageModel
  //       .findById(message._id)
  //       .populate('sender', 'name email');
  //   } else {
  //     return message; // simple return for socket use
  //   }
  // }

  findAll() {
    return this.messageModel.find().sort({ createdAt: -1 }).exec();
  }
  async getMyInboxList(userId: string) {
    return this.messageModel.aggregate([
      {
        $match: {
          $or: [
            { sender: new Types.ObjectId(userId) },
            { receiver: new Types.ObjectId(userId) },
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
                else: ['$receiver'], // group chat
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
              { $eq: ['$lastMessage.sender', new Types.ObjectId(userId)] },
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

  // async getMyInboxList(userId: string) {
  //   return this.messageModel.aggregate([
  //     {
  //       $match: {
  //         sender: new Types.ObjectId(userId),
  //       },
  //     },
  //     {
  //       $sort: { createdAt: -1 },
  //     },
  //     {
  //       $group: {
  //         _id: {
  //           chatType: '$chatType',
  //           receiver: '$receiver',
  //         },
  //         lastMessage: { $first: '$$ROOT' },
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: 'users', // assumes 'users' collection for personal chats
  //         localField: '_id.receiver',
  //         foreignField: '_id',
  //         as: 'userInfo',
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: 'groups', // assumes 'groups' collection for group chats
  //         localField: '_id.receiver',
  //         foreignField: '_id',
  //         as: 'groupInfo',
  //       },
  //     },
  //     {
  //       $project: {
  //         chatType: '$_id.chatType',
  //         receiverId: '$_id.receiver',
  //         lastMessage: {
  //           text: '$lastMessage.text',
  //           type: '$lastMessage.type',
  //           createdAt: '$lastMessage.createdAt',
  //         },
  //         userInfo: { $arrayElemAt: ['$userInfo', 0] },
  //         groupInfo: { $arrayElemAt: ['$groupInfo', 0] },
  //       },
  //     },
  //     {
  //       $sort: { 'lastMessage.createdAt': -1 },
  //     },
  //   ]);
  // }

  async getChatMessagesForAdmin(
    chatType: 'personal' | 'group',
    userId: string,
    targetId: string,
  ) {
    const matchQuery =
      chatType === 'personal'
        ? {
            chatType: 'personal',
            $and: [
              {
                $or: [
                  {
                    sender: new Types.ObjectId(userId),
                    receiver: new Types.ObjectId(targetId),
                  },
                  {
                    sender: new Types.ObjectId(targetId),
                    receiver: new Types.ObjectId(userId),
                  },
                ],
              },
              {
                $or: [
                  { sender: new Types.ObjectId(userId) },
                  { visibility: 'public' },
                ],
              },
            ],
          }
        : {
            chatType: 'group',
            receiver: new Types.ObjectId(targetId),
            $or: [
              { sender: new Types.ObjectId(userId) },
              { visibility: 'public' },
            ],
          };

    return this.messageModel
      .find(matchQuery)
      .sort({ createdAt: 1 })
      .populate('sender', 'name avatar') // optional
      .exec();
  }
  async getChatMessages(
    chatType: 'personal' | 'group',
    userId: string,
    targetId: string,
  ) {
    const matchQuery =
      chatType === 'personal'
        ? {
            chatType: 'personal',
            $or: [
              {
                sender: new Types.ObjectId(userId),
                receiver: new Types.ObjectId(targetId),
              },
              {
                sender: new Types.ObjectId(targetId),
                receiver: new Types.ObjectId(userId),
              },
            ],
          }
        : {
            chatType: 'group',
            receiver: new Types.ObjectId(targetId),
          };

    return this.messageModel
      .find(matchQuery)
      .sort({ createdAt: 1 })
      .populate('sender', 'name avatar') // optional
      .exec();
  }

  findByChat(receiverId: string) {
    return this.messageModel.find({ receiver: receiverId }).exec();
  }

  findOne(id: string) {
    return this.messageModel.findById(id).exec();
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
    return this.messageModel.findByIdAndUpdate(id, updateMessageDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.messageModel.findByIdAndDelete(id);
  }
}
