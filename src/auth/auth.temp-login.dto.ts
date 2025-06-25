import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class TempLoginUserDto {
  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the user',
  })
  @IsNotEmpty()
  @IsString(null)
  phone: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
