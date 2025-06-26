import mongoose from 'mongoose';
export declare const MessageSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    sender: mongoose.Types.ObjectId;
    type: "text" | "image" | "file" | "video" | "audio";
    receiver: mongoose.Types.ObjectId;
    chatType: "personal" | "group";
    status: "sent" | "delivered" | "read";
    visibility: "public" | "private";
    text?: string;
    fileUrl?: string;
    replyTo?: mongoose.Types.ObjectId;
    replyToUser?: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    sender: mongoose.Types.ObjectId;
    type: "text" | "image" | "file" | "video" | "audio";
    receiver: mongoose.Types.ObjectId;
    chatType: "personal" | "group";
    status: "sent" | "delivered" | "read";
    visibility: "public" | "private";
    text?: string;
    fileUrl?: string;
    replyTo?: mongoose.Types.ObjectId;
    replyToUser?: mongoose.Types.ObjectId;
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    sender: mongoose.Types.ObjectId;
    type: "text" | "image" | "file" | "video" | "audio";
    receiver: mongoose.Types.ObjectId;
    chatType: "personal" | "group";
    status: "sent" | "delivered" | "read";
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
