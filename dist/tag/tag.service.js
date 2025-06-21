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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tag_schema_1 = require("./schemas/tag.schema");
const mongoose_2 = require("mongoose");
let TagService = class TagService {
    constructor(TagModel) {
        this.TagModel = TagModel;
    }
    async create(createTagDto) {
        const lengthOfItem = await this.TagModel.countDocuments();
        const result = await this.TagModel.create({
            ...createTagDto,
            position: lengthOfItem + 1,
        });
        return result;
    }
    async findAll(status) {
        const query = {};
        if (status === 'active' || status === 'inactive' || status === 'deleted') {
            query.status = status;
        }
        const result = await this.TagModel.find(query)
            .sort({ position: 1 })
            .lean()
            .exec();
        return result;
    }
    async findOne(id) {
        return await this.TagModel.findById(id).lean().exec();
    }
    async update(id, updateTagDto) {
        return await this.TagModel.findByIdAndUpdate(id, updateTagDto);
    }
    async updateStatus(id, status) {
        return await this.TagModel.findByIdAndUpdate(id, { status }, { new: true, useFindAndModify: false });
    }
    async remove(id) {
        return await this.TagModel.findByIdAndDelete(id);
    }
};
exports.TagService = TagService;
exports.TagService = TagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tag_schema_1.Tag.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TagService);
//# sourceMappingURL=tag.service.js.map