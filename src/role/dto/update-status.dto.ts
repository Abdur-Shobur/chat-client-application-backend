// src/brands/dto/update-status.dto.ts
import { IsEnum } from 'class-validator';
import { IRoleStatus } from '../interfaces/role.interfaces';

export class UpdateStatusDto {
  @IsEnum(IRoleStatus)
  status: IRoleStatus;
}
