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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_interfaces_1 = require("../interfaces/user.interfaces");
const role_schema_1 = require("../../role/schemas/role.schema");
let User = class User {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        minlength: [2, 'name must be at least 2 characters long'],
        maxlength: [120, 'name must be at most 120 characters long'],
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        unique: true,
        required: false,
        maxlength: [15, 'phone must be at most 15 characters long'],
    }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        maxlength: [120, 'email must be at most 120 characters long'],
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        maxlength: [120, 'password must be at most 120 characters long'],
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: role_schema_1.Role.name,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Position is required'],
        min: [0, 'Position must be a positive number'],
        default: 0,
    }),
    __metadata("design:type", Number)
], User.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: {
            values: [user_interfaces_1.IUserStatus.Active, user_interfaces_1.IUserStatus.Inactive, user_interfaces_1.IUserStatus.Deleted],
            message: '{VALUE} is not a valid status',
        },
        default: user_interfaces_1.IUserStatus.Inactive,
    }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: {
            transform: (_doc, ret) => {
                delete ret.password;
                return ret;
            },
        },
    })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map