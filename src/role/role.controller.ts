import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Injectable,
} from '@nestjs/common';
import { ResponseHelper } from 'src/helper';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { AuthGuard } from 'src/helper/auth-guard';
import { Role, Roles } from 'src/role/decorator';

@UseGuards(AuthGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly RoleService: RoleService) {}
  /**
   * create Role
   */
  @Post()
  @Roles(Role.ROLE_CREATE)
  async create(@Body() createRoleDto: CreateRoleDto) {
    const result = await this.RoleService.create(createRoleDto);

    if (!result) {
      return ResponseHelper.error('Role not created');
    }

    return ResponseHelper.success(result, 'Role created successfully');
  }

  /**
   * get Role
   */
  @Get()
  @Roles(Role.ROLE_ALL)
  async findAll(@Query('status') status?: string) {
    const result = await this.RoleService.findAll(status);

    // if not found
    if (!result) {
      return ResponseHelper.error('Role not found');
    }

    // if found
    return ResponseHelper.success(result);
  }

  /**
   * get Role single
   */
  @Get(':id')
  @Roles(Role.ROLE_VIEW)
  async findOne(@Param('id') id: string) {
    const result = await this.RoleService.findOne(id);

    // if not found
    if (!result) {
      return ResponseHelper.error('Role not found');
    }

    // if found
    return ResponseHelper.success(result);
  }

  /**
   * update Role
   */
  @Patch(':id')
  @Roles(Role.ROLE_UPDATE)
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const getRole = await this.RoleService.findOne(id);

    if (!getRole) {
      return ResponseHelper.error('Role not found');
    }

    const result = await this.RoleService.update(id, updateRoleDto);

    if (!result) {
      return ResponseHelper.error('Role not updated');
    }

    return ResponseHelper.success(result, 'Role updated successfully');
  }

  /**
   * Update the  Status
   */
  @Patch('status/:id')
  @Roles(Role.ROLE_STATUS)
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto, // Get the new status from request body
  ) {
    const result = await this.RoleService.updateStatus(
      id,
      updateStatusDto.status,
    );

    if (!result) {
      return ResponseHelper.error('Status not updated');
    }

    return ResponseHelper.success(result, 'Status updated successfully');
  }

  /**
   * delete Role
   */
  @Delete(':id')
  @Roles(Role.ROLE_DELETE)
  async remove(@Param('id') id: string) {
    const result = await this.RoleService.remove(id);

    if (!result) {
      return ResponseHelper.error('Role not deleted');
    }

    return ResponseHelper.success(result, 'Role deleted successfully');
  }
}
