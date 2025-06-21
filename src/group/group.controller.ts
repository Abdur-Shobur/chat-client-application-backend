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
  Req,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ResponseHelper } from 'src/helper';
import { AuthGuard } from 'src/helper/auth-guard';
import { Role, Roles } from 'src/role/decorator';
import { UpdateStatusDto } from './dto/update-status.dto'; // Optional, if group has status
import { JoinGroupDto } from './dto/join-group.dto';

@UseGuards(AuthGuard)
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  /**
   * Create a Group
   */
  @Post()
  // @Roles(Role.GROUP_CREATE)
  async create(@Req() req: any, @Body() createGroupDto: CreateGroupDto) {
    const data = {
      ...createGroupDto,
      createdBy: req.user._id,
    };

    // Ensure creator is added as a member
    if (!data.members.includes(req.user._id)) {
      data.members.push(req.user._id);
    }

    const result = await this.groupService.create(data);
    if (!result) return ResponseHelper.error('Group not created');
    return ResponseHelper.success(result, 'Group created successfully');
  }

  /**
   * Get all Groups (optionally filtered by joinType)
   */
  @Get()
  // @Roles(Role.GROUP_ALL)
  async findAll(@Query('joinType') joinType?: 'public' | 'private') {
    const result = await this.groupService.findAll(joinType);
    if (!result) return ResponseHelper.error('Groups not found');
    return ResponseHelper.success(result);
  }

  /**
   *  My Groups
   *  Retrieves groups that the user is a member of
   */
  @Get('my-groups')
  async myGroups(@Req() req: any) {
    const userId = req.user._id;
    const result = await this.groupService.getMyJoinedGroups(userId);
    if (!result) return ResponseHelper.error('Groups not found');
    return ResponseHelper.success(result);
  }

  /**
   *  Join a Group
   */

  @Post('join')
  async joinGroup(@Body() dto: JoinGroupDto, @Req() req: any) {
    const userId = req.user._id;
    const result = await this.groupService.joinGroup(dto.groupId, userId);
    if (!result) {
      return ResponseHelper.error('Failed to join group');
    }
    return ResponseHelper.success(result);
  }
  /**
   * Get a single Group by ID
   */
  @Get(':id')
  // @Roles(Role.GROUP_VIEW)
  async findOne(@Param('id') id: string) {
    const result = await this.groupService.findOne(id);
    if (!result) return ResponseHelper.error('Group not found');
    return ResponseHelper.success(result);
  }

  /**
   * Update a Group
   */
  @Patch(':id')
  // @Roles(Role.GROUP_UPDATE)
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    const existing = await this.groupService.findOne(id);
    if (!existing) return ResponseHelper.error('Group not found');

    const result = await this.groupService.update(id, updateGroupDto);
    if (!result) return ResponseHelper.error('Group not updated');
    return ResponseHelper.success(result, 'Group updated successfully');
  }

  /**
   * Update Group status (optional, if status is included in the schema)
   */
  @Patch('status/:id')
  // @Roles(Role.GROUP_STATUS)
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    const result = await this.groupService.updateStatus(
      id,
      updateStatusDto.status,
    );
    if (!result) return ResponseHelper.error('Status not updated');
    return ResponseHelper.success(result, 'Status updated successfully');
  }

  /**
   * Delete a Group
   */
  @Delete(':id')
  // @Roles(Role.GROUP_DELETE)
  async remove(@Param('id') id: string) {
    const result = await this.groupService.remove(id);
    if (!result) return ResponseHelper.error('Group not deleted');
    return ResponseHelper.success(result, 'Group deleted successfully');
  }
}
