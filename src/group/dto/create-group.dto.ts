import {
  IsString,
  IsOptional,
  IsUrl,
  IsEnum,
  IsArray,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IGroupStatus } from '../interfaces/group.interfaces';

export class CreateGroupDto {
  @ApiProperty({ example: 'Test Group' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Description' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ example: 'https://example.com/icon.png' })
  @IsOptional()
  iconUrl?: string;

  @ApiProperty({ example: '67b2c9fc32c98e2ba9cce8d2' })
  @IsOptional()
  createdBy: string;

  @ApiPropertyOptional({ enum: ['public', 'private'] })
  @IsOptional()
  @IsEnum(['public', 'private'])
  joinType?: 'public' | 'private';

  @ApiPropertyOptional({ example: 'https://example.com/join' })
  @IsOptional()
  @IsString()
  joinLink?: string;

  @ApiPropertyOptional({ enum: ['auto', 'admin'], example: 'auto' })
  @IsOptional()
  @IsEnum(['auto', 'admin'])
  joinApprovalType?: 'auto' | 'admin';

  @ApiProperty({ example: 'Welcome to the group!' })
  @IsString()
  welcomeMessage: string;

  @ApiPropertyOptional({ type: [String], example: ['user1', 'user2'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  members?: string[];

  @ApiPropertyOptional({ type: [String], example: ['pending 1', 'pending 2'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  pendingMembers?: string[];

  @ApiPropertyOptional({ type: [String], example: ['tag 1', 'tag 2'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

  @ApiProperty({ example: IGroupStatus.Active })
  @IsOptional()
  @IsEnum(IGroupStatus, {
    message: '{VALUE} is not a valid status',
  })
  status?: IGroupStatus;
}
