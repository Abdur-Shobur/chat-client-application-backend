"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupSchema = exports.Group = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const group_interfaces_1 = require("../interfaces/group.interfaces");
const user_schema_1 = require("../../user/schemas/user.schema");
const tag_schema_1 = require("../../tag/schemas/tag.schema");
let Group = class Group {
};
exports.Group = Group;
__decorate([
    (0, mongoose_1.Prop)({
        unique: true,
        required: false,
        minlength: [2, 'name must be at least 2 characters long'],
        maxlength: [120, 'name must be at most 120 characters long'],
    }),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        minlength: [2, 'description must be at least 2 characters long'],
        maxlength: [120, 'description must be at most 120 characters long'],
    }),
    __metadata("design:type", String)
], Group.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        minlength: [1, 'icon must be at least 1 characters long'],
        maxlength: [120, 'icon must be at most 120 characters long'],
    }),
    __metadata("design:type", String)
], Group.prototype, "iconUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: [mongoose_2.default.Schema.Types.ObjectId],
        ref: user_schema_1.User.name,
    }),
    __metadata("design:type", String)
], Group.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['public', 'private'], default: 'public' }),
    __metadata("design:type", String)
], Group.prototype, "joinType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Group.prototype, "joinLink", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['auto', 'admin'] }),
    __metadata("design:type", String)
], Group.prototype, "joinApprovalType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Group.prototype, "welcomeMessage", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: [mongoose_2.default.Schema.Types.ObjectId],
        ref: user_schema_1.User.name,
    }),
    __metadata("design:type", Array)
], Group.prototype, "members", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: [mongoose_2.default.Schema.Types.ObjectId],
        ref: user_schema_1.User.name,
    }),
    __metadata("design:type", Array)
], Group.prototype, "pendingMembers", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: [mongoose_2.default.Schema.Types.ObjectId],
        ref: tag_schema_1.Tag.name,
    }),
    __metadata("design:type", Array)
], Group.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: {
            values: [
                group_interfaces_1.IGroupStatus.Active,
                group_interfaces_1.IGroupStatus.Inactive,
                group_interfaces_1.IGroupStatus.Deleted,
            ],
            message: '{VALUE} is not a valid status',
        },
        default: group_interfaces_1.IGroupStatus.Active,
    }),
    __metadata("design:type", String)
], Group.prototype, "status", void 0);
exports.Group = Group = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Group);
exports.GroupSchema = mongoose_1.SchemaFactory.createForClass(Group);
//# sourceMappingURL=group.schema.js.map