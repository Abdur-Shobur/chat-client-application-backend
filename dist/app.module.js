"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("./config");
const site_setting_module_1 = require("./site-setting/site-setting.module");
const upload_module_1 = require("./upload/upload.module");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
const tag_module_1 = require("./tag/tag.module");
const dev_permission_category_module_1 = require("./dev-permission-category/dev-permission-category.module");
const dev_permission_sub_category_module_1 = require("./dev-permission-sub-category/dev-permission-sub-category.module");
const role_module_1 = require("./role/role.module");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./helper/jwt.strategy");
const auth_guard_1 = require("./helper/auth-guard");
const test_zod_module_1 = require("./test-zod/test-zod.module");
const global_setting_module_1 = require("./global-setting/global-setting.module");
const migration_module_1 = require("./migration/migration.module");
const group_module_1 = require("./group/group.module");
const message_module_1 = require("./message/message.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            jwt_strategy_1.JwtGlobalModule,
            passport_1.PassportModule,
            auth_module_1.AuthModule,
            config_1.CustomConfigModule,
            upload_module_1.UploadModule,
            site_setting_module_1.SiteSettingModule,
            tag_module_1.TagModule,
            dev_permission_category_module_1.DevPermissionCategoryModule,
            dev_permission_sub_category_module_1.DevPermissionSubCategoryModule,
            role_module_1.RoleModule,
            user_module_1.UserModule,
            test_zod_module_1.TestZodModule,
            global_setting_module_1.GlobalSettingModule,
            migration_module_1.MigrationModule,
            group_module_1.GroupModule,
            message_module_1.MessageModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, auth_guard_1.AuthGuard, auth_guard_1.AuthOnlyPermission],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map