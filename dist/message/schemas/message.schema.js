"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MessageSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose_1.Schema.Types.ObjectId, required: true },
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
}, { timestamps: true });
//# sourceMappingURL=message.schema.js.map