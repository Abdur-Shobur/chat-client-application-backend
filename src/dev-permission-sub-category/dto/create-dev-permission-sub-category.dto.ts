import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  IDevPermissionSubCategory,
  IDevPermissionSubCategoryStatus,
} from '../interfaces/dev-permission-sub-category.interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDevPermissionSubCategoryDto
  implements IDevPermissionSubCategory
{
  @ApiProperty({ required: true, description: 'Name of the category' })
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(120, { message: 'Name must be at most 120 characters long' })
  name: string;

  @ApiProperty({ required: true, description: 'Category of the category' })
  @IsString()
  @MaxLength(120, { message: 'Category must be at most 120 characters long' })
  category: string;

  @ApiProperty({ required: false, description: 'Permission Key' })
  @IsOptional()
  @IsString()
  @MinLength(2, {
    message: 'permission Key must be at least 2 characters long',
  })
  @MaxLength(120, {
    message: 'permission Key must be at most 120 characters long',
  })
  permissionKey: string;

  @ApiProperty({ required: false, description: 'Description of the category' })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'description must be at least 2 characters long' })
  @MaxLength(120, {
    message: 'description must be at most 120 characters long',
  })
  description: string;

  @ApiProperty({ required: false, description: 'Status of the category' })
  @IsOptional()
  @IsEnum(IDevPermissionSubCategoryStatus, {
    message: '{VALUE} is not a valid status',
  })
  status?: IDevPermissionSubCategoryStatus;
}
