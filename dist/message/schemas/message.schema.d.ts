import { Schema } from 'mongoose';
export declare const MessageSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "text" | "file" | "image" | "video" | "audio";
    status: "sent" | "delivered" | "read";
    sender: import("mongoose").Types.ObjectId;
    receiver: import("mongoose").Types.ObjectId;
    chatType: "group" | "personal";
    visibility: "public" | "private";
    text?: string;
    fileUrl?: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "text" | "file" | "image" | "video" | "audio";
    status: "sent" | "delivered" | "read";
    sender: import("mongoose").Types.ObjectId;
    receiver: import("mongoose").Types.ObjectId;
    chatType: "group" | "personal";
    visibility: "public" | "private";
    text?: string;
    fileUrl?: string;
}>, {}> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: "text" | "file" | "image" | "video" | "audio";
    status: "sent" | "delivered" | "read";
    sender: import("mongoose").Types.ObjectId;
    receiver: import("mongoose").Types.ObjectId;
    chatType: "group" | "personal";
    visibility: "public" | "private";
    text?: string;
    fileUrl?: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
