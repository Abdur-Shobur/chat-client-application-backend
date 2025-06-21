// src/brands/dto/update-status.dto.ts
import { IsEnum } from 'class-validator';
import { IGroupStatus } from '../interfaces/group.interfaces';

export class UpdateStatusDto {
  @IsEnum(IGroupStatus)
  status: IGroupStatus;
}
