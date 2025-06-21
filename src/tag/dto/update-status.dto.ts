// src/brands/dto/update-status.dto.ts
import { IsEnum } from 'class-validator';
import { ITagStatus } from '../interfaces/tag.interfaces';

export class UpdateStatusDto {
  @IsEnum(ITagStatus)
  status: ITagStatus;
}
