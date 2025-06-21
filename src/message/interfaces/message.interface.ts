import { Types } from 'mongoose';

export type ChatType = 'personal' | 'group';
export type MessageType = 'text' | 'image' | 'file' | 'video' | 'audio';
export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface IMessage {
  _id?: Types.ObjectId;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  chatType: ChatType;
  text?: string;
  fileUrl?: string;
  type: MessageType;
  status: MessageStatus;
  createdAt?: Date;
  visibility?: 'public' | 'private';
  updatedAt?: Date;
}
