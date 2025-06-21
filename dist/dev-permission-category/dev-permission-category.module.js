"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevPermissionCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const dev_permission_category_service_1 = require("./dev-permission-category.service");
const dev_permission_category_controller_1 = require("./dev-permission-category.controller");
const mongoose_1 = require("@nestjs/mongoose");
const dev_permission_category_schema_1 = require("./schemas/dev-permission-category.schema");
const dev_permission_sub_category_schema_1 = require("../dev-permission-sub-category/schemas/dev-permission-sub-category.schema");
let DevPermissionCategoryModule = class DevPermissionCategoryModule {
};
exports.DevPermissionCategoryModule = DevPermissionCategoryModule;
exports.DevPermissionCategoryModule = DevPermissionCategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: dev_permission_category_schema_1.DevPermissionCategory.name, schema: dev_permission_category_schema_1.DevPermissionCategorySchema },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: dev_permission_sub_category_schema_1.DevPermissionSubCategory.name,
                    schema: dev_permission_sub_category_schema_1.DevPermissionSubCategorySchema,
                },
            ]),
        ],
        controllers: [dev_permission_category_controller_1.DevPermissionCategoryController],
        providers: [dev_permission_category_service_1.DevPermissionCategoryService],
    })
], DevPermissionCategoryModule);
//# sourceMappingURL=dev-permission-category.module.js.map