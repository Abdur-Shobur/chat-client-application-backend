import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  IDevPermissionCategory,
  IDevPermissionCategoryStatus,
} from '../interfaces/dev-permission-category.interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDevPermissionCategoryDto implements IDevPermissionCategory {
  @ApiProperty({ required: true, description: 'Name of the category' })
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(120, { message: 'Name must be at most 120 characters long' })
  name: string;

  @ApiProperty({ required: true, description: 'Permission Key' })
  @IsString()
  @MinLength(2, {
    message: 'permission Key must be at least 2 characters long',
  })
  @MaxLength(120, {
    message: 'permission Key must be at most 120 characters long',
  })
  permissionKey: string;

  @ApiProperty({ required: true, description: 'Description of the category' })
  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'description must be at least 2 characters long' })
  @MaxLength(120, {
    message: 'description must be at most 120 characters long',
  })
  description: string;

  @ApiProperty({
    required: false,
    description: 'Status of the category is active or inactive or deleted',
  })
  @IsOptional()
  @IsEnum(IDevPermissionCategoryStatus, {
    message: '{VALUE} is not a valid status',
  })
  status?: IDevPermissionCategoryStatus;
}
