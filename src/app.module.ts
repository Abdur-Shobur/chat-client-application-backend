import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './config';
import { SiteSettingModule } from './site-setting/site-setting.module';
import { UploadModule } from './upload/upload.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TagModule } from './tag/tag.module';
import { DevPermissionCategoryModule } from './dev-permission-category/dev-permission-category.module';
import { DevPermissionSubCategoryModule } from './dev-permission-sub-category/dev-permission-sub-category.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtGlobalModule } from './helper/jwt.strategy';
import { AuthGuard, AuthOnlyPermission } from './helper/auth-guard';
import { TestZodModule } from './test-zod/test-zod.module';
import { GlobalSettingModule } from './global-setting/global-setting.module';
import { MigrationModule } from './migration/migration.module';
import { GroupModule } from './group/group.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    // for public visible files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // Expose files via /uploads/<filename>
    }),
    JwtGlobalModule,
    PassportModule,
    AuthModule,
    CustomConfigModule,
    UploadModule,
    SiteSettingModule,
    TagModule,
    DevPermissionCategoryModule,
    DevPermissionSubCategoryModule,
    RoleModule,
    UserModule,
    TestZodModule,
    GlobalSettingModule,
    MigrationModule,
    GroupModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard, AuthOnlyPermission],
})
export class AppModule {}
