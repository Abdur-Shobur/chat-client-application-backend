// src/brands/dto/update-status.dto.ts
import { IsEnum } from 'class-validator';
import { IUserStatus } from '../interfaces/user.interfaces';

export class UpdateStatusDto {
  @IsEnum(IUserStatus)
  status: IUserStatus;
}
