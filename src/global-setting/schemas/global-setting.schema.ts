import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IGlobalSetting } from '../interfaces/global-setting.interfaces';

// Define the type for GlobalSetting document
export type GlobalSettingDocument = HydratedDocument<GlobalSetting>;

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class GlobalSetting implements IGlobalSetting {
  //   Role
  @Prop({
    ref: 'Role',
    required: false,
    minlength: [2, 'Role must be at least 2 characters long'],
    maxlength: [120, 'Role must be at most 120 characters long'],
  })
  default_user_role: string;
}

// Create the schema
export const GlobalSettingSchema = SchemaFactory.createForClass(GlobalSetting);
