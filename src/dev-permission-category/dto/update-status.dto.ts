// src/brands/dto/update-status.dto.ts
import { IsEnum } from 'class-validator';
import { IDevPermissionCategoryStatus } from '../interfaces/dev-permission-category.interfaces';

export class UpdateStatusDto {
  @IsEnum(IDevPermissionCategoryStatus)
  status: IDevPermissionCategoryStatus;
}
