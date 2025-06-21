import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IRole, IRoleStatus, IRoleType } from '../interfaces/role.interfaces';
import { DevPermissionSubCategory } from 'src/dev-permission-sub-category/schemas/dev-permission-sub-category.schema';

// Define the type for Role document
export type RoleDocument = HydratedDocument<Role>;

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class Role implements IRole {
  //   name
  @Prop({
    required: false,
    minlength: [2, 'name must be at least 2 characters long'],
    maxlength: [120, 'name must be at most 120 characters long'],
  })
  name: string;

  //   type
  @Prop({
    required: false,
    enum: {
      values: [IRoleType.Admin, IRoleType.User],
      message: '{VALUE} is not a valid type',
    },
    default: IRoleType.User, // Default to User if not specified
  })
  type: IRoleType;

  //   devPermission
  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: DevPermissionSubCategory.name,
  })
  permissions: string[];

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
      values: [IRoleStatus.Active, IRoleStatus.Inactive, IRoleStatus.Deleted],
      message: '{VALUE} is not a valid status',
    },
    default: IRoleStatus.Active,
  })
  status?: IRoleStatus;
}

// Create the schema
export const RoleSchema = SchemaFactory.createForClass(Role);
