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
import { JwtService } from '@nestjs/jwt';
import { AuthWsMiddleware } from 'src/helper/ws-auth.middleware';
import { CustomConfigService } from 'src/config';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private connectedUsers = new Map<string, string>(); // socket.id -> userId

  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly jwtService: JwtService,
    private readonly configService: CustomConfigService,
  ) {}

  afterInit(server: Server) {
    console.log('WebSocket Server Initialized');

    // Attach auth middleware
    server.use(
      AuthWsMiddleware(this.jwtService, this.configService, this.userService),
    );
  }

  handleConnection(socket: Socket) {
    const user = socket.data.user;
    if (user) {
      this.connectedUsers.set(socket.id, user._id.toString());
      console.log(`Client connected: ${socket.id} (userId: ${user._id})`);
    } else {
      console.warn(`Unauthorized socket tried to connect: ${socket.id}`);
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket) {
    const userId = this.connectedUsers.get(socket.id);
    console.log(`Client disconnected: ${socket.id} (userId: ${userId})`);
    this.connectedUsers.delete(socket.id);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() data: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const senderUser = client.data.user;
    if (!senderUser) {
      client.emit('unauthorized');
      return;
    }

    const savedMessage = await this.messageService.create({
      ...data,
      sender: senderUser._id,
    });

    // 2. Emit message to receiver(s)
    if (data.chatType === 'personal') {
      // Find socket by userId
      for (const [socketId, userId] of this.connectedUsers.entries()) {
        if (userId === data.receiver) {
          client.to(socketId).emit('receiveMessage', savedMessage);
        }
      }
    } else if (data.chatType === 'group') {
      console.log({ savedMessage });
      // Broadcast to everyone except sender
      client.broadcast.emit('receiveMessage', savedMessage);
    }

    // if (data.chatType === 'personal') {
    //   for (const [socketId, userId] of this.connectedUsers.entries()) {
    //     if (userId === data.receiver) {
    //       client.to(socketId).emit('receiveMessage', savedMessage);
    //     }
    //   }
    // } else if (data.chatType === 'group') {
    //   const group = await this.groupService.findOne(data.receiver);
    //   if (savedMessage.visibility === 'public') {
    //     for (const [socketId, userId] of this.connectedUsers.entries()) {
    //       if (
    //         group.members.includes(userId) &&
    //         userId !== senderUser._id.toString()
    //       ) {
    //         client.to(socketId).emit('receiveMessage', savedMessage);
    //       }
    //     }
    //   } else {
    //     for (const [socketId, userId] of this.connectedUsers.entries()) {
    //       if (userId === group.createdBy.toString()) {
    //         client.to(socketId).emit('receiveMessage', savedMessage);
    //       }
    //     }
    //   }
    // }

    client.emit('messageSent', savedMessage);
  }
}
