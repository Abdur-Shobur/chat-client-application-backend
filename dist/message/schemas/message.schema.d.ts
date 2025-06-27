import mongoose from 'mongoose';
export declare const MessageSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "text" | "file" | "image" | "video" | "audio";
    status: "sent" | "delivered" | "read";
    chatType: "group" | "personal";
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    visibility: "public" | "private";
    text?: string;
    fileUrl?: string;
    replyTo?: mongoose.Types.ObjectId;
    replyToUser?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "text" | "file" | "image" | "video" | "audio";
    status: "sent" | "delivered" | "read";
    chatType: "group" | "personal";
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    visibility: "public" | "private";
    text?: string;
    fileUrl?: string;
    replyTo?: mongoose.Types.ObjectId;
    replyToUser?: mongoose.Types.ObjectId;
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "text" | "file" | "image" | "video" | "audio";
    status: "sent" | "delivered" | "read";
    chatType: "group" | "personal";
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    visibility: "public" | "private";
    text?: string;
    fileUrl?: string;
    replyTo?: mongoose.Types.ObjectId;
    replyToUser?: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
