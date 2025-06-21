import { Model, Types } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { IMessage } from './interfaces/message.interface';
import { IGroup } from 'src/group/interfaces/group.interfaces';
export declare class MessageService {
    private readonly messageModel;
    private readonly groupModel;
    constructor(messageModel: Model<IMessage>, groupModel: Model<IGroup>);
    create(createMessageDto: CreateMessageDto): Promise<import("mongoose").Document<unknown, {}, IMessage, {}> & IMessage & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, IMessage, {}> & IMessage & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getMyInboxList(userId: string): Promise<any[]>;
    getChatMessagesForAdmin(chatType: 'personal' | 'group', userId: string, targetId: string): Promise<(import("mongoose").Document<unknown, {}, IMessage, {}> & IMessage & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getChatMessages(chatType: 'personal' | 'group', userId: string, targetId: string): Promise<(import("mongoose").Document<unknown, {}, IMessage, {}> & IMessage & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findByChat(receiverId: string): Promise<(import("mongoose").Document<unknown, {}, IMessage, {}> & IMessage & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, IMessage, {}> & IMessage & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, updateMessageDto: UpdateMessageDto): import("mongoose").Query<import("mongoose").Document<unknown, {}, IMessage, {}> & IMessage & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, IMessage, {}> & IMessage & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, {}, IMessage, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, IMessage, {}> & IMessage & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, IMessage, {}> & IMessage & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, {}, IMessage, "findOneAndDelete", {}>;
}
