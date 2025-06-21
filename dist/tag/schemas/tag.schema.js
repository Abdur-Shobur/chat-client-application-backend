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
exports.TagSchema = exports.Tag = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const tag_interfaces_1 = require("../interfaces/tag.interfaces");
let Tag = class Tag {
};
exports.Tag = Tag;
__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        minlength: [2, 'name must be at least 2 characters long'],
        maxlength: [120, 'name must be at most 120 characters long'],
    }),
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Position is required'],
        min: [0, 'Position must be a positive number'],
        default: 0,
    }),
    __metadata("design:type", Number)
], Tag.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: {
            values: [tag_interfaces_1.ITagStatus.Active, tag_interfaces_1.ITagStatus.Inactive, tag_interfaces_1.ITagStatus.Deleted],
            message: '{VALUE} is not a valid status',
        },
        default: tag_interfaces_1.ITagStatus.Active,
    }),
    __metadata("design:type", String)
], Tag.prototype, "status", void 0);
exports.Tag = Tag = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], Tag);
exports.TagSchema = mongoose_1.SchemaFactory.createForClass(Tag);
//# sourceMappingURL=tag.schema.js.map