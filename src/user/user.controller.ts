import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseHelper } from 'src/helper';
import { AuthGuard } from 'src/helper/auth-guard';
import { Role, Roles } from 'src/role/decorator';
import { CreateUserDto } from './dto/create-user.dto';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * get user
   */
  @Get()
  @Roles(Role.USER_ALL)
  async findAll(@Req() req: any, @Query('status') status?: string) {
    const userId = req?.user?.id;
    const result = await this.userService.findAllUser(status, userId);

    // if not found
    if (!result) {
      return ResponseHelper.error('User not found');
    }

    // if found
    return ResponseHelper.success(result);
  }

  /**
   * Create a user
   */
  @Post()
  // @Roles(Role.User_CREATE)
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    if (!result) return ResponseHelper.error('User not created');
    return ResponseHelper.success(result, 'User created successfully');
  }
}
