import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from 'src/helper/auth-guard';
import { ResponseHelper } from 'src/helper';

@UseGuards(AuthGuard)
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

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
    if (req?.user?.role === 'admin') {
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
