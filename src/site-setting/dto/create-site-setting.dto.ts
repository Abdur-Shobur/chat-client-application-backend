import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ISiteSetting } from '../interfaces/site-setting.interfaces';

export class CreateSiteSettingDto implements ISiteSetting {
  // name
  @ApiProperty({
    description: 'Site name',
    required: false,
    minLength: 3,
  })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Site name must be at least 3 characters long' })
  name?: string;

  // description
  @ApiProperty({
    description: 'Description of the site',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, {
    message: 'Description must be at most 255 characters long',
  })
  description?: string;

  // meta title
  @ApiProperty({
    description: 'Meta title for SEO',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Meta Title must be at most 255 characters long' })
  metaTitle?: string;

  // meta description
  @ApiProperty({
    description: 'Meta description for SEO',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, {
    message: 'Meta Description must be at most 255 characters long',
  })
  metaDescription?: string;

  // meta keywords
  @ApiProperty({
    description: 'Meta keywords for SEO',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, {
    message: 'Meta Keywords must be at most 255 characters long',
  })
  metaKeywords?: string;

  // meta author
  @ApiProperty({
    description: 'Meta author for SEO',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, {
    message: 'Meta Author must be at most 255 characters long',
  })
  metaAuthor?: string;

  // meta copyright
  @ApiProperty({
    description: 'Meta copyright information',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, {
    message: 'Meta Copyright must be at most 255 characters long',
  })
  metaCopyright?: string;

  // logo
  @ApiProperty({
    description: 'Logo URL',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Logo URL must be at most 255 characters long' })
  logo?: string;

  // favicon
  @ApiProperty({
    description: 'Favicon URL',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, {
    message: 'Favicon URL must be at most 255 characters long',
  })
  favicon?: string;

  // footer text
  @ApiProperty({
    description: 'Footer text to display at the bottom of the page',
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255, {
    message: 'Footer Text must be at most 255 characters long',
  })
  footerText?: string;
}
