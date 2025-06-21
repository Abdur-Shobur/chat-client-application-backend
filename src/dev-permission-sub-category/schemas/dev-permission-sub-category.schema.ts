import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import {
  IDevPermissionSubCategory,
  IDevPermissionSubCategoryStatus,
} from '../interfaces/dev-permission-sub-category.interfaces';
import { DevPermissionCategory } from 'src/dev-permission-category/schemas/dev-permission-category.schema';

// Define the type for DevPermissionSubCategory document
export type DevPermissionSubCategoryDocument =
  HydratedDocument<DevPermissionSubCategory>;

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class DevPermissionSubCategory implements IDevPermissionSubCategory {
  //   name
  @Prop({
    required: false,
    minlength: [2, 'name must be at least 2 characters long'],
    maxlength: [120, 'name must be at most 120 characters long'],
  })
  name: string;

  //   category
  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: DevPermissionCategory.name,
  })
  category: string;

  //   permissionKey
  @Prop({
    required: false,
    unique: true,
    minlength: [2, 'Permission Key must be at least 2 characters long'],
    maxlength: [120, 'Permission Key must be at most 120 characters long'],
  })
  permissionKey: string;

  //   name
  @Prop({
    required: false,
    minlength: [2, 'description must be at least 2 characters long'],
    maxlength: [120, 'description must be at most 120 characters long'],
  })
  description: string;

  // position
  @Prop({
    required: [true, 'Position is required'],
    min: [0, 'Position must be a positive number'],
    default: 0,
  })
  position: number;

  // status
  @Prop({
    enum: {
      values: [
        IDevPermissionSubCategoryStatus.ForLoginUser,
        IDevPermissionSubCategoryStatus.Inactive,
        IDevPermissionSubCategoryStatus.Deleted,
        IDevPermissionSubCategoryStatus.ForAnyOne,
      ],
      message: '{VALUE} is not a valid status',
    },
    default: IDevPermissionSubCategoryStatus.ForLoginUser,
  })
  status?: IDevPermissionSubCategoryStatus;
}

// Create the schema
export const DevPermissionSubCategorySchema = SchemaFactory.createForClass(
  DevPermissionSubCategory,
);
