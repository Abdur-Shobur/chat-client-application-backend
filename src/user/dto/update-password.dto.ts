import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @MinLength(6)
  @MaxLength(120)
  currentPassword: string;

  @IsString()
  @MinLength(6)
  @MaxLength(120)
  newPassword: string;
}
