import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from 'src/helper/auth-guard';
import { ResponseHelper } from 'src/helper';
import { GroupService } from 'src/group/group.service';
import { UserService } from 'src/user/user.service';

@UseGuards(AuthGuard)
@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
  ) {}

  // @Post()
  // create(@Body() dto: CreateMessageDto) {
  //   return this.messageService.create(dto );
  // }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }
  @Get('chat')
  async findAllChat(@Req() req: any) {
    const result = await this.messageService.getMyInboxList(req.user._id);
    if (!result) return ResponseHelper.error('Chats not found');
    return ResponseHelper.success(result);
  }

  @Get('chat-messages/:chatType/:targetId')
  getChatMessages(
    @Req() req: any,
    @Param('chatType') chatType: 'personal' | 'group',
    @Param('targetId') targetId: string,
  ) {
    if (req?.user?.role?.type === 'admin') {
      return this.messageService.getChatMessagesForAdmin(
        chatType,
        req.user._id,
        targetId,
      );
    } else {
      return this.messageService.getChatMessages(
        chatType,
        req.user._id,
        targetId,
      );
    }
  }

  @Get('chat/:receiverId')
  findByChat(@Param('receiverId') receiverId: string) {
    return this.messageService.findByChat(receiverId);
  }

  //  info endpoint to get chat info
  @Get('info/:id')
  async getChatInfo(
    @Param('id') id: string,
    @Query('type') type: 'personal' | 'group',
  ) {
    if (type !== 'group' && type !== 'personal') {
      return ResponseHelper.error('Type is required');
    }

    if (type === 'group') {
      const group = await this.groupService.findOne(id);

      if (!group) {
        return ResponseHelper.error(`Group with ID ${id} not found`);
      }

      // Return group info with type
      return ResponseHelper.success(
        { ...group, type: 'group' },
        'Group info retrieved successfully',
      );
    }

    if (type === 'personal') {
      const user = await this.userService.findByIdOnlyUser(id);
      if (!user) {
        return ResponseHelper.error(`User with ID ${id} not found`);
      }

      return ResponseHelper.success(
        { _id: user._id, name: user.name, role: user.role, type: 'user' },
        'User info retrieved successfully',
      );
    }

    return ResponseHelper.error('Something went wrong, please try again');
  }

  @Patch('toggle-visibility/:id')
  async toggleVisibility(@Param('id') id: string) {
    const result = await this.messageService.toggleVisibility(id);
    if (!result) return ResponseHelper.error('Message not found');
    return ResponseHelper.success(result, 'Updated visibility successfully');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMessageDto) {
    return this.messageService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}
