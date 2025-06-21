import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'email must be at least 2 characters long' })
  @MaxLength(120, {
    message: 'email must be at most 120 characters long',
  })
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(120, {
    message: 'password type must be at most 120 characters long',
  })
  password: string;
}
