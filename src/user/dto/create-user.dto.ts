import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IUser, IUserStatus } from '../interfaces/user.interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements IUser {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(120, { message: 'Name must be at most 120 characters long' })
  name: string;

  @ApiProperty({ example: 'example@example.com' })
  @IsString()
  @MinLength(2, { message: 'email must be at least 2 characters long' })
  @MaxLength(120, {
    message: 'email must be at most 120 characters long',
  })
  email: string;

  @ApiProperty({ example: '1234567890' })
  @IsString()
  @MinLength(2, { message: 'phone must be at least 2 characters long' })
  @MaxLength(15, {
    message: 'phone must be at most 15 characters long',
  })
  phone: string;

  @ApiProperty({ example: '67b2c25d6b596336d2a471bf' })
  @IsString()
  @IsOptional()
  role: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @MaxLength(120, {
    message: 'password type must be at most 120 characters long',
  })
  password: string;

  @ApiProperty({ example: IUserStatus.Active })
  @IsOptional()
  @IsEnum(IUserStatus, {
    message: '{VALUE} is not a valid status',
  })
  status?: IUserStatus;
}
