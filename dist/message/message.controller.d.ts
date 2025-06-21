import { MessageService } from './message.service';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./interfaces/message.interface").IMessage, {}> & import("./interfaces/message.interface").IMessage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findAllChat(req: any): Promise<import("../type").IApiResponse<any[]>>;
    getChatMessages(req: any, chatType: 'personal' | 'group', targetId: string): Promise<(import("mongoose").Document<unknown, {}, import("./interfaces/message.interface").IMessage, {}> & import("./interfaces/message.interface").IMessage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findByChat(receiverId: string): Promise<(import("mongoose").Document<unknown, {}, import("./interfaces/message.interface").IMessage, {}> & import("./interfaces/message.interface").IMessage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./interfaces/message.interface").IMessage, {}> & import("./interfaces/message.interface").IMessage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateMessageDto): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("./interfaces/message.interface").IMessage, {}> & import("./interfaces/message.interface").IMessage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, import("./interfaces/message.interface").IMessage, {}> & import("./interfaces/message.interface").IMessage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("./interfaces/message.interface").IMessage, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<import("mongoose").Document<unknown, {}, import("./interfaces/message.interface").IMessage, {}> & import("./interfaces/message.interface").IMessage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, import("mongoose").Document<unknown, {}, import("./interfaces/message.interface").IMessage, {}> & import("./interfaces/message.interface").IMessage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("./interfaces/message.interface").IMessage, "findOneAndDelete", {}>;
}
