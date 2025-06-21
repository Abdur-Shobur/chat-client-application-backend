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
import { DevPermissionSubCategoryService } from './dev-permission-sub-category.service';
import { CreateDevPermissionSubCategoryDto } from './dto/create-dev-permission-sub-category.dto';
import { UpdateDevPermissionSubCategoryDto } from './dto/update-dev-permission-sub-category.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { AuthGuard } from 'src/helper/auth-guard';
import { Role, Roles } from 'src/role/decorator';

// @UseGuards(AuthGuard)
@Controller('dev-permission-sub-category')
export class DevPermissionSubCategoryController {
  constructor(
    private readonly DevPermissionSubCategoryService: DevPermissionSubCategoryService,
  ) {}
  /**
   * create Dev Permission Category
   */
  @Post()
  // @Roles(Role.PERMISSION_ITEM_CREATE)
  async create(
    @Body()
    createDevPermissionSubCategoryDto: CreateDevPermissionSubCategoryDto,
  ) {
    const result = await this.DevPermissionSubCategoryService.create(
      createDevPermissionSubCategoryDto,
    );

    if (!result) {
      return ResponseHelper.error('Dev Permission Sub Category not created');
    }

    return ResponseHelper.success(
      result,
      'Dev Permission Sub Category created successfully',
    );
  }

  /**
   * get Dev Permission Category
   */
  @Get()
  // @Roles(Role.PERMISSION_ITEM_ALL)
  async findAll(@Query('status') status?: string) {
    const result = await this.DevPermissionSubCategoryService.findAll(status);

    // if not found
    if (!result) {
      return ResponseHelper.error('Dev Permission Sub Category not found');
    }

    // if found
    return ResponseHelper.success(result);
  }
  /**
   * get Dev Permission Category
   */
  @Get('permission-away')
  // @Roles(Role.PERMISSION_ITEM_KEYS)
  async findAllPermissionAway() {
    const result = await this.DevPermissionSubCategoryService.findAll();

    const formatData = result.map((data) => {
      return `${data.permissionKey.toUpperCase()}=${data.permissionKey}`;
    });

    // if not found
    if (!result) {
      return ResponseHelper.error('Dev Permission Sub Category not found');
    }

    // if found
    return ResponseHelper.success(formatData);
  }

  /**
   * get Dev Permission Category single
   */
  @Get(':id')
  // @Roles(Role.PERMISSION_ITEM_VIEW)
  async findOne(@Param('id') id: string) {
    const result = await this.DevPermissionSubCategoryService.findOne(id);

    // if not found
    if (!result) {
      return ResponseHelper.error('Dev Permission Sub Category not found');
    }

    // if found
    return ResponseHelper.success(result);
  }

  /**
   * update Dev Permission Category
   */
  @Patch(':id')
  // @Roles(Role.PERMISSION_ITEM_UPDATE)
  async update(
    @Param('id') id: string,
    @Body()
    updateDevPermissionSubCategoryDto: UpdateDevPermissionSubCategoryDto,
  ) {
    const result = await this.DevPermissionSubCategoryService.update(
      id,
      updateDevPermissionSubCategoryDto,
    );

    if (!result) {
      return ResponseHelper.error('Dev Permission Sub Category not updated');
    }

    return ResponseHelper.success(
      result,
      'Dev Permission Sub Category updated successfully',
    );
  }

  /**
   * Update the  Status
   */
  @Patch('status/:id')
  // @Roles(Role.PERMISSION_ITEM_UPDATE)
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto, // Get the new status from request body
  ) {
    const result = await this.DevPermissionSubCategoryService.updateStatus(
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
  // @Roles(Role.PERMISSION_ITEM_DELETE)
  async remove(@Param('id') id: string) {
    const result = await this.DevPermissionSubCategoryService.remove(id);

    if (!result) {
      return ResponseHelper.error('Dev Permission Sub Category not deleted');
    }

    return ResponseHelper.success(
      result,
      'Dev Permission Sub Category deleted successfully',
    );
  }
}
