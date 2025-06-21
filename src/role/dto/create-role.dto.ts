import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IRole, IRoleStatus, IRoleType } from '../interfaces/role.interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto implements IRole {
  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(120, { message: 'Name must be at most 120 characters long' })
  name: string;

  @ApiProperty()
  @IsEnum(IRoleType, {
    message: '{VALUE} is not a valid type',
  })
  type: IRoleType = IRoleType.User; // Default to User if not specified

  @ApiProperty()
  @IsArray({ message: 'Permissions is required' })
  @ArrayMinSize(1, { message: 'Minimum 1 permission is required' })
  @ArrayMaxSize(500, {
    message: 'Maximum 500 permissions are allowed',
  })
  permissions: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(120, {
    message: 'description must be at most 120 characters long',
  })
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(IRoleStatus, {
    message: '{VALUE} is not a valid status',
  })
  status?: IRoleStatus;
}
