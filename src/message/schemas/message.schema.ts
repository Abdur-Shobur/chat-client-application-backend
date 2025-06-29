import mongoose, { Schema } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export const MessageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: User.name, required: true },
    receiver: { type: Schema.Types.ObjectId, required: true },
    chatType: {
      type: String,
      enum: ['personal', 'group'],
      required: true,
    },
    text: { type: String, trim: true },
    fileUrl: { type: String },
    type: {
      type: String,
      enum: ['text', 'image', 'file', 'video', 'audio'],
      default: 'text',
    },
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
    replyToUser: { type: mongoose.Schema.Types.ObjectId, ref: User.name },
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
