"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevPermissionSubCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const dev_permission_sub_category_service_1 = require("./dev-permission-sub-category.service");
const dev_permission_sub_category_controller_1 = require("./dev-permission-sub-category.controller");
const mongoose_1 = require("@nestjs/mongoose");
const dev_permission_sub_category_schema_1 = require("./schemas/dev-permission-sub-category.schema");
let DevPermissionSubCategoryModule = class DevPermissionSubCategoryModule {
};
exports.DevPermissionSubCategoryModule = DevPermissionSubCategoryModule;
exports.DevPermissionSubCategoryModule = DevPermissionSubCategoryModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: dev_permission_sub_category_schema_1.DevPermissionSubCategory.name,
                    schema: dev_permission_sub_category_schema_1.DevPermissionSubCategorySchema,
                },
            ]),
        ],
        controllers: [dev_permission_sub_category_controller_1.DevPermissionSubCategoryController],
        providers: [dev_permission_sub_category_service_1.DevPermissionSubCategoryService],
        exports: [dev_permission_sub_category_service_1.DevPermissionSubCategoryService],
    })
], DevPermissionSubCategoryModule);
//# sourceMappingURL=dev-permission-sub-category.module.js.map