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
exports.DevPermissionSubCategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const dev_permission_sub_category_schema_1 = require("./schemas/dev-permission-sub-category.schema");
const mongoose_2 = require("mongoose");
let DevPermissionSubCategoryService = class DevPermissionSubCategoryService {
    constructor(DevPermissionSubCategoryModel) {
        this.DevPermissionSubCategoryModel = DevPermissionSubCategoryModel;
    }
    async create(createDevPermissionSubCategoryDto) {
        if (!mongoose_2.Types.ObjectId.isValid(createDevPermissionSubCategoryDto.category)) {
            throw new common_1.BadRequestException('Invalid category');
        }
        const lengthOfItem = await this.DevPermissionSubCategoryModel.countDocuments();
        const result = await this.DevPermissionSubCategoryModel.create({
            ...createDevPermissionSubCategoryDto,
            position: lengthOfItem + 1,
        });
        return result;
    }
    async findAll(status) {
        const query = {};
        if (status === 'active' || status === 'inactive' || status === 'deleted') {
            query.status = status;
        }
        const result = await this.DevPermissionSubCategoryModel.find(query)
            .sort({ position: 1 })
            .populate('category', 'name status')
            .lean()
            .exec();
        return result;
    }
    async findOne(id) {
        return await this.DevPermissionSubCategoryModel.findById(id)
            .populate('category', 'name status')
            .lean()
            .exec();
    }
    async update(id, updateDevPermissionSubCategoryDto) {
        return await this.DevPermissionSubCategoryModel.findByIdAndUpdate(id, updateDevPermissionSubCategoryDto);
    }
    async updateStatus(id, status) {
        return await this.DevPermissionSubCategoryModel.findByIdAndUpdate(id, { status }, { new: true, useFindAndModify: false });
    }
    async remove(id) {
        return await this.DevPermissionSubCategoryModel.findByIdAndDelete(id);
    }
};
exports.DevPermissionSubCategoryService = DevPermissionSubCategoryService;
exports.DevPermissionSubCategoryService = DevPermissionSubCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(dev_permission_sub_category_schema_1.DevPermissionSubCategory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DevPermissionSubCategoryService);
//# sourceMappingURL=dev-permission-sub-category.service.js.map