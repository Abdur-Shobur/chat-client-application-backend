import { ChatType, MessageType } from '../interfaces/message.interface';
export declare class CreateMessageDto {
    sender: string;
    receiver: string;
    chatType: ChatType;
    text?: string;
    fileUrl?: string;
    type: MessageType;
    visibility?: 'public' | 'private';
}
