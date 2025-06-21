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
exports.RoleSchema = exports.Role = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const role_interfaces_1 = require("../interfaces/role.interfaces");
const dev_permission_sub_category_schema_1 = require("../../dev-permission-sub-category/schemas/dev-permission-sub-category.schema");
let Role = class Role {
};
exports.Role = Role;
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        minlength: [2, 'name must be at least 2 characters long'],
        maxlength: [120, 'name must be at most 120 characters long'],
    }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        enum: {
            values: [role_interfaces_1.IRoleType.Admin, role_interfaces_1.IRoleType.User],
            message: '{VALUE} is not a valid type',
        },
        default: role_interfaces_1.IRoleType.User,
    }),
    __metadata("design:type", String)
], Role.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: [mongoose_2.default.Schema.Types.ObjectId],
        ref: dev_permission_sub_category_schema_1.DevPermissionSubCategory.name,
    }),
    __metadata("design:type", Array)
], Role.prototype, "permissions", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        minlength: [2, 'description must be at least 2 characters long'],
        maxlength: [120, 'description must be at most 120 characters long'],
    }),
    __metadata("design:type", String)
], Role.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Position is required'],
        min: [0, 'Position must be a positive number'],
        default: 0,
    }),
    __metadata("design:type", Number)
], Role.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: {
            values: [role_interfaces_1.IRoleStatus.Active, role_interfaces_1.IRoleStatus.Inactive, role_interfaces_1.IRoleStatus.Deleted],
            message: '{VALUE} is not a valid status',
        },
        default: role_interfaces_1.IRoleStatus.Active,
    }),
    __metadata("design:type", String)
], Role.prototype, "status", void 0);
exports.Role = Role = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Role);
exports.RoleSchema = mongoose_1.SchemaFactory.createForClass(Role);
//# sourceMappingURL=role.schema.js.map