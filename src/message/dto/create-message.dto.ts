import { IsEnum, IsOptional, IsString, IsMongoId } from 'class-validator';
import { ChatType, MessageType } from '../interfaces/message.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    description: 'ID of the sender',
  })
  @IsMongoId()
  sender: string;

  @ApiProperty({
    description: 'ID of the receiver (user or group)',
  })
  @IsMongoId()
  receiver: string;

  @ApiProperty({
    description: 'Type of chat (personal or group)',
    enum: ['personal', 'group'],
  })
  @IsEnum(['personal', 'group'])
  chatType: ChatType;

  @ApiProperty({
    description: 'Text content of the message',
    required: false,
  })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty({
    description: 'URL of the image if the message is an image',
    required: false,
  })
  @IsOptional()
  @IsString()
  fileUrl?: string;

  @ApiProperty({
    description: 'URL of the file if the message is a file',
    required: false,
  })
  @IsEnum(['text', 'image', 'file', 'video', 'audio'])
  type: MessageType;

  @ApiProperty({
    default: 'private',
    description: 'Visibility of the message',
    enum: ['public', 'private'],
  })
  @IsOptional()
  visibility?: 'public' | 'private';
}
