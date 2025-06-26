"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const mongoose_1 = require("mongoose");
const user_schema_1 = require("../../user/schemas/user.schema");
exports.MessageSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: user_schema_1.User.name, required: true },
    receiver: { type: mongoose_1.Schema.Types.ObjectId, required: true },
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
    replyTo: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Message' },
    replyToUser: { type: mongoose_1.default.Schema.Types.ObjectId, ref: user_schema_1.User.name },
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
}, { timestamps: true });
//# sourceMappingURL=message.schema.js.map