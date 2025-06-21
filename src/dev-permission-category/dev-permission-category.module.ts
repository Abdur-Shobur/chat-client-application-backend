import { Module } from '@nestjs/common';
import { DevPermissionCategoryService } from './dev-permission-category.service';
import { DevPermissionCategoryController } from './dev-permission-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DevPermissionCategory,
  DevPermissionCategorySchema,
} from './schemas/dev-permission-category.schema';
import {
  DevPermissionSubCategory,
  DevPermissionSubCategorySchema,
} from 'src/dev-permission-sub-category/schemas/dev-permission-sub-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DevPermissionCategory.name, schema: DevPermissionCategorySchema },
    ]),
    MongooseModule.forFeature([
      {
        name: DevPermissionSubCategory.name,
        schema: DevPermissionSubCategorySchema,
      },
    ]),
  ],
  controllers: [DevPermissionCategoryController],
  providers: [DevPermissionCategoryService],
})
export class DevPermissionCategoryModule {}
