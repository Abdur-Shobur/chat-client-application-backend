import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
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
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
   * get user by id
   */
  @Get(':id')
  // @Roles(Role.USER_VIEW)
  async findOne(@Param('id') id: string) {
    const result = await this.userService.findById(id);
    if (!result) return ResponseHelper.error('User not found');
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

  /**
   * Update the  Status
   */
  @Patch('status/:id')
  // @Roles(Role.ROLE_STATUS)
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto, // Get the new status from request body
  ) {
    const result = await this.userService.updateStatus(
      id,
      updateStatusDto.status,
    );

    if (!result) {
      return ResponseHelper.error('Status not updated');
    }

    return ResponseHelper.success(result, 'Status updated successfully');
  }

  /**
   * update a user
   */
  @Put('update/:id')
  // @Roles(Role.USER_UPDATE)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.userService.update(id, updateUserDto);
    if (!result) return ResponseHelper.error('User not updated');
    return ResponseHelper.success(result, 'User updated successfully');
  }

  /**
   * delete a user
   *
   */
  @Delete('delete/:id')
  // @Roles(Role.USER_DELETE)
  async delete(@Param('id') id: string) {
    const result = await this.userService.delete(id);
    if (!result) return ResponseHelper.error('User not deleted');
    return ResponseHelper.success(result, 'User deleted successfully');
  }
}
