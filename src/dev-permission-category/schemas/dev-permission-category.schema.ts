import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  IDevPermissionCategory,
  IDevPermissionCategoryStatus,
} from '../interfaces/dev-permission-category.interfaces';

// Define the type for DevPermissionCategory document
export type DevPermissionCategoryDocument =
  HydratedDocument<DevPermissionCategory>;

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class DevPermissionCategory implements IDevPermissionCategory {
  //   name
  @Prop({
    required: false,
    minlength: [2, 'name must be at least 2 characters long'],
    maxlength: [120, 'name must be at most 120 characters long'],
    trim: true,
  })
  name: string;

  //   permissionKey
  @Prop({
    required: false,
    unique: true,
    minlength: [2, 'Permission Key must be at least 2 characters long'],
    maxlength: [120, 'Permission Key must be at most 120 characters long'],
    trim: true,
  })
  permissionKey: string;

  //   description
  @Prop({
    required: false,
    minlength: [2, 'description must be at least 2 characters long'],
    maxlength: [120, 'description must be at most 120 characters long'],
    trim: true,
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
        IDevPermissionCategoryStatus.Active,
        IDevPermissionCategoryStatus.Inactive,
        IDevPermissionCategoryStatus.Deleted,
      ],
      message: '{VALUE} is not a valid status',
    },
    default: IDevPermissionCategoryStatus.Active,
  })
  status?: IDevPermissionCategoryStatus;
}

// Create the schema
export const DevPermissionCategorySchema = SchemaFactory.createForClass(
  DevPermissionCategory,
);
