import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ITag, ITagStatus } from '../interfaces/tag.interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto implements ITag {
  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(120, { message: 'Name must be at most 120 characters long' })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ITagStatus, { message: '{VALUE} is not a valid status' })
  status?: ITagStatus;
}
