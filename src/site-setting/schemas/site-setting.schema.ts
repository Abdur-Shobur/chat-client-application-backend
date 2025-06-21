import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { ISiteSetting } from '../interfaces/site-setting.interfaces';

// Define the type for SiteSetting document
export type SiteSettingDocument = HydratedDocument<SiteSetting>;

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class SiteSetting implements ISiteSetting {
  // Site name
  @Prop({
    required: false,
    minlength: [3, 'Site name must be at least 3 characters long'],
  })
  name: string;

  // Description
  @Prop({
    required: false,
    default: null,
    maxlength: [255, 'Description must be at most 255 characters long'],
  })
  @IsOptional()
  description: string;

  // Meta Title
  @Prop({
    required: false,
    default: null,
    maxlength: [255, 'Meta Title must be at most 255 characters long'],
  })
  @IsOptional()
  metaTitle: string;

  // Meta Description
  @Prop({
    required: false,
    default: null,
    maxlength: [255, 'Meta Description must be at most 255 characters long'],
  })
  @IsOptional()
  metaDescription: string;

  // Meta Keywords
  @Prop({
    required: false,
    default: null,
    maxlength: [255, 'Meta Keywords must be at most 255 characters long'],
  })
  @IsOptional()
  metaKeywords: string;

  // Meta Author
  @Prop({
    required: false,
    default: null,
    maxlength: [255, 'Meta Author must be at most 255 characters long'],
  })
  @IsOptional()
  metaAuthor: string;

  // Meta Copyright
  @Prop({
    required: false,
    default: null,
    maxlength: [255, 'Meta Copyright must be at most 255 characters long'],
  })
  @IsOptional()
  metaCopyright: string;

  // Logo URL
  @Prop({
    required: false,
    default: null,
    maxlength: [255, 'Logo URL must be at most 255 characters long'],
  })
  @IsOptional()
  logo: string;

  // Favicon URL
  @Prop({
    required: false,
    default: null,
    maxlength: [255, 'Favicon URL must be at most 255 characters long'],
  })
  @IsOptional()
  favicon: string;

  // Footer Text
  @Prop({
    required: false,
    default: null,
    maxlength: [255, 'Footer Text must be at most 255 characters long'],
  })
  @IsOptional()
  footerText: string;
}

// Create the schema
export const SiteSettingSchema = SchemaFactory.createForClass(SiteSetting);
