import { IsString, MaxLength, MinLength } from 'class-validator';
import { IGlobalSetting } from '../interfaces/global-setting.interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGlobalSettingDto implements IGlobalSetting {
  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Role must be at least 2 characters long' })
  @MaxLength(255, { message: 'Role must be at most 255 characters long' })
  default_user_role: string;
}
