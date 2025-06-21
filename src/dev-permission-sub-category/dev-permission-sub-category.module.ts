import { Global, Module } from '@nestjs/common';
import { DevPermissionSubCategoryService } from './dev-permission-sub-category.service';
import { DevPermissionSubCategoryController } from './dev-permission-sub-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DevPermissionSubCategory,
  DevPermissionSubCategorySchema,
} from './schemas/dev-permission-sub-category.schema';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DevPermissionSubCategory.name,
        schema: DevPermissionSubCategorySchema,
      },
    ]),
  ],
  controllers: [DevPermissionSubCategoryController],
  providers: [DevPermissionSubCategoryService],
  exports: [DevPermissionSubCategoryService],
})
export class DevPermissionSubCategoryModule {}
