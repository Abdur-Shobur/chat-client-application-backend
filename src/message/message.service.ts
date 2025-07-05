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

  /*

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
          groupInfo: { $arrayElemAt: ['$groupInfo', 0] },
          participants: '$_id.participants',
        },
      },
 
      {
        $sort: { 'lastMessage.createdAt': -1 },
      },
    ]);
  }
  */
  async getMyInboxList(userId: string) {
    const userObjectId = new Types.ObjectId(userId);

    // 1. Fetch personal chat threads
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

    // 2. Fetch all groups the user belongs to
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

    // 3. Combine and sort by latest activity
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

  async getChatMessages(
    chatType: 'personal' | 'group',
    userId: string,
    targetId: string,
    page: number,
    limit: number,
  ) {
    const userObjectId = new Types.ObjectId(userId);
    const targetObjectId = new Types.ObjectId(targetId);
    const skip = (page - 1) * limit;

    const matchQuery =
      chatType === 'personal'
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

    // Execute both count and find queries in parallel
    const [messages, total] = await Promise.all([
      this.messageModel
        .find(matchQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
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
        .exec(),
      this.messageModel.countDocuments(matchQuery),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      messages: messages.reverse(), // Optional: oldest-to-newest
      meta: {
        total,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    };
  }

  /*
  async getChatMessages(
    chatType: 'personal' | 'group',
    userId: string,
    targetId: string,
  ) {
    const userObjectId = new Types.ObjectId(userId);
    const targetObjectId = new Types.ObjectId(targetId);

    const matchQuery =
      chatType === 'personal'
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
              // {
              //   $and: [{ visibility: 'public' }, { replyToUser: userObjectId }],
              // },
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

async getChatMessagesForAdmin(
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
*/

  async getChatMessagesForAdmin(
    chatType: 'personal' | 'group',
    userId: string,
    targetId: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;

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

    // Fetch messages and count in parallel
    const [messages, total] = await Promise.all([
      this.messageModel
        .find(matchQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
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
        .exec(),
      this.messageModel.countDocuments(matchQuery),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      messages: messages.reverse(), // Optional: make them oldest to newest
      meta: {
        total,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    };
  }

  findByChat(receiverId: string) {
    return this.messageModel.find({ receiver: receiverId }).exec();
  }

  async toggleVisibility(messageId: string) {
    const message = await this.messageModel.findById(messageId);
    message.visibility = message.visibility === 'public' ? 'private' : 'public';
    await message.save();
    return message;
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

  deleteByAllInGroupId(groupId: string) {
    return this.messageModel.deleteMany({
      receiver: new Types.ObjectId(groupId),
    });
  }
}
