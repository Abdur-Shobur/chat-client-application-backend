```ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UserService } from 'src/user/user.service';
import { GroupService } from 'src/group/group.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/helper/auth-guard';

@WebSocketGateway({ cors: true }) // Enable CORS for local dev
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private connectedUsers = new Map<string, string>(); // socket.id -> userId

  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
  ) {}

  afterInit(server: Server) {
    console.log('WebSocket Server Initialized');
  }

  handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    const userId = this.connectedUsers.get(socket.id);
    console.log(`Client disconnected: ${socket.id} (userId: ${userId})`);
    this.connectedUsers.delete(socket.id);
  }

  @SubscribeMessage('register')
  handleRegister(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.connectedUsers.set(client.id, userId);
    console.log(`User ${userId} registered with socket ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  // async handleSendMessage(
  //   @MessageBody() data: CreateMessageDto,
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   const senderUser = await this.userService.findById(data.sender); // Or inject with auth
  //   const savedMessage = await this.messageService.create(
  //     data,
  //     senderUser._id.toString(),
  //   );

  //   if (data.chatType === 'personal') {
  //     for (const [socketId, userId] of this.connectedUsers.entries()) {
  //       if (userId === data.receiver) {
  //         client.to(socketId).emit('receiveMessage', savedMessage);
  //       }
  //     }
  //   } else if (data.chatType === 'group') {
  //     const group = await this.groupService.findOne(data.receiver);

  //     if (savedMessage.visibility === 'public') {
  //       // Send to all group members except sender
  //       for (const [socketId, userId] of this.connectedUsers.entries()) {
  //         if (group.members.includes(userId) && userId !== data.sender) {
  //           client.to(socketId).emit('receiveMessage', savedMessage);
  //         }
  //       }
  //     } else {
  //       // Send only to group admin (createdBy)
  //       for (const [socketId, userId] of this.connectedUsers.entries()) {
  //         if (userId === group.createdBy.toString()) {
  //           client.to(socketId).emit('receiveMessage', savedMessage);
  //         }
  //       }
  //     }
  //   }

  //   // Always send back to sender
  //   client.emit('messageSent', savedMessage);
  // }
  async handleSendMessage(
    @MessageBody() data: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    // 1. Save message in DB
    const savedMessage = await this.messageService.create(data);

    // 2. Emit message to receiver(s)
    if (data.chatType === 'personal') {
      // Find socket by userId
      for (const [socketId, userId] of this.connectedUsers.entries()) {
        if (userId === data.receiver) {
          client.to(socketId).emit('receiveMessage', savedMessage);
        }
      }
    } else if (data.chatType === 'group') {
      // Broadcast to everyone except sender
      client.broadcast.emit('receiveMessage', savedMessage);
    }

    // 3. Optionally send back to sender for UI update
    client.emit('messageSent', savedMessage);
  }
}
```
