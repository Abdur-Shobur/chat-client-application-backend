import { Schema } from 'mongoose';
import {
  MessageType,
  ChatType,
  MessageStatus,
} from '../interfaces/message.interface';

export const MessageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, required: true },
    chatType: {
      type: String,
      enum: ['personal', 'group'],
      required: true,
    },
    text: { type: String },
    fileUrl: { type: String },
    type: {
      type: String,
      enum: ['text', 'image', 'file', 'video', 'audio'],
      default: 'text',
    },
    status: {
      type: String,
      enum: ['sent', 'delivered', 'read'],
      default: 'sent',
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'private',
    },
  },
  { timestamps: true },
);
