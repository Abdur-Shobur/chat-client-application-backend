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
} from '@nestjs/common';
import { ResponseHelper } from 'src/helper';
import { DevPermissionCategoryService } from './dev-permission-category.service';
import { CreateDevPermissionCategoryDto } from './dto/create-dev-permission-category.dto';
import { UpdateDevPermissionCategoryDto } from './dto/update-dev-permission-category.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { AuthGuard } from 'src/helper/auth-guard';
import { Role, Roles } from 'src/role/decorator';

// @UseGuards(AuthGuard)
@Controller('dev-permission-category')
export class DevPermissionCategoryController {
  constructor(
    private readonly DevPermissionCategoryService: DevPermissionCategoryService,
  ) {}
  /**
   * create Dev Permission Category
   */
  @Post()
  // @Roles(Role.DEV_PERMISSION_CREATE)
  async create(
    @Body() createDevPermissionCategoryDto: CreateDevPermissionCategoryDto,
  ) {
    const result = await this.DevPermissionCategoryService.create(
      createDevPermissionCategoryDto,
    );

    if (!result) {
      return ResponseHelper.error('Dev Permission Category not created');
    }

    return ResponseHelper.success(
      result,
      'Dev Permission Category created successfully',
    );
  }

  /**
   * get Dev Permission Category
   */
  @Get()
  // @Roles(Role.DEV_PERMISSION_ALL)
  async findAll(@Query('status') status?: string) {
    const result = await this.DevPermissionCategoryService.findAll(status);

    // if not found
    if (!result) {
      return ResponseHelper.error('Dev Permission Category not found');
    }

    // if found
    return ResponseHelper.success(result);
  }

  /**
   * get Dev Permission Category single
   */
  @Get(':id')
  // @Roles(Role.DEV_PERMISSION_VIEW)
  async findOne(@Param('id') id: string) {
    const result = await this.DevPermissionCategoryService.findOne(id);

    // if not found
    if (!result) {
      return ResponseHelper.error('Dev Permission Category not found');
    }

    // if found
    return ResponseHelper.success(result);
  }

  /**
   * update Dev Permission Category
   */
  @Patch(':id')
  // @Roles(Role.DEV_PERMISSION_UPDATE)
  async update(
    @Param('id') id: string,
    @Body() updateDevPermissionCategoryDto: UpdateDevPermissionCategoryDto,
  ) {
    const result = await this.DevPermissionCategoryService.update(
      id,
      updateDevPermissionCategoryDto,
    );

    if (!result) {
      return ResponseHelper.error('Dev Permission Category not updated');
    }

    return ResponseHelper.success(
      result,
      'Dev Permission Category updated successfully',
    );
  }

  /**
   * Update the  Status
   */
  @Patch('status/:id')
  // @Roles(Role.DEV_PERMISSION_STATUS)
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto, // Get the new status from request body
  ) {
    const result = await this.DevPermissionCategoryService.updateStatus(
      id,
      updateStatusDto.status,
    );

    if (!result) {
      return ResponseHelper.error('Status not updated');
    }

    return ResponseHelper.success(result, 'Status updated successfully');
  }

  /**
   * delete Dev Permission Category
   */
  @Delete(':id') 
  // @Roles(Role.DEV_PERMISSION_DELETE)
  async remove(@Param('id') id: string) {
    const result = await this.DevPermissionCategoryService.remove(id);

    if (!result) {
      return ResponseHelper.error('Dev Permission Category not deleted');
    }

    return ResponseHelper.success(
      result,
      'Dev Permission Category deleted successfully',
    );
  }
}
