// dto/join-group.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class JoinGroupDto {
  @ApiProperty({
    description: 'The ID of the group to join',
    example: '60c72b2f9b1e8b001c8e4d5a',
  })
  @IsMongoId()
  groupId: string;
}
