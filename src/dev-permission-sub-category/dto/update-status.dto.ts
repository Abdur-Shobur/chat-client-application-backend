// src/brands/dto/update-status.dto.ts
import { IsEnum } from 'class-validator';
import { IDevPermissionSubCategoryStatus } from '../interfaces/dev-permission-sub-category.interfaces';

export class UpdateStatusDto {
  @IsEnum(IDevPermissionSubCategoryStatus)
  status: IDevPermissionSubCategoryStatus;
}
