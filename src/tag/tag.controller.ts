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
import { TagService } from './tag.service';
import { ResponseHelper } from 'src/helper';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { AuthGuard } from 'src/helper/auth-guard';
import { Role, Roles } from 'src/role/decorator';

@UseGuards(AuthGuard)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  /**
   * create Tag
   */
  @Post()
  @Roles(Role.TAG_CREATE)
  async create(@Body() createTagDto: CreateTagDto) {
    const result = await this.tagService.create(createTagDto);

    if (!result) {
      return ResponseHelper.error('Tag not created');
    }

    return ResponseHelper.success(result, 'Tag created successfully');
  }

  /**
   * get Tag
   */
  @Get()
  @Roles(Role.TAG_ALL)
  async findAll(@Query('status') status?: string) {
    const result = await this.tagService.findAll(status);

    // if not found
    if (!result) {
      return ResponseHelper.error('Tag not found');
    }

    // if found
    return ResponseHelper.success(result);
  }

  /**
   * get Tag single
   */
  @Get(':id')
  @Roles(Role.TAG_VIEW)
  async findOne(@Param('id') id: string) {
    const result = await this.tagService.findOne(id);

    // if not found
    if (!result) {
      return ResponseHelper.error('Tag not found');
    }

    // if found
    return ResponseHelper.success(result);
  }

  /**
   * update Tag
   */
  @Patch(':id')
  @Roles(Role.TAG_UPDATE)
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    const result = await this.tagService.update(id, updateTagDto);

    if (!result) {
      return ResponseHelper.error('Tag not updated');
    }

    return ResponseHelper.success(result, 'Tag updated successfully');
  }

  /**
   * Update the  Status
   */
  @Patch('status/:id')
  @Roles(Role.TAG_STATUS)
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto, // Get the new status from request body
  ) {
    const result = await this.tagService.updateStatus(
      id,
      updateStatusDto.status,
    );

    if (!result) {
      return ResponseHelper.error('Status not updated');
    }

    return ResponseHelper.success(result, 'Status updated successfully');
  }

  /**
   * delete Tag
   */
  @Delete(':id')
  @Roles(Role.TAG_DELETE)
  async remove(@Param('id') id: string) {
    const result = await this.tagService.remove(id);

    if (!result) {
      return ResponseHelper.error('Tag not deleted');
    }

    return ResponseHelper.success(result, 'Tag deleted successfully');
  }
}
