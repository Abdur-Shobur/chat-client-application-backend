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
  private connectedUsersDetailed = new Map<string, any>(); // socket.id -> user object
  private server: Server; // Add this line

  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly jwtService: JwtService,
    private readonly configService: CustomConfigService,
  ) {}

  afterInit(server: Server) {
    this.server = server; // Store the server instance
    console.log('WebSocket Server Initialized');

    server.use(
      AuthWsMiddleware(this.jwtService, this.configService, this.userService),
    );
  }
  handleConnection(socket: Socket) {
    const user = socket.data.user;
    if (user) {
      // Disconnect any existing sockets for this user
      for (const [sockId, userId] of this.connectedUsers.entries()) {
        if (userId === user._id.toString()) {
          const existingSocket = this.server.sockets.sockets.get(sockId);
          if (existingSocket && existingSocket.id !== socket.id) {
            existingSocket.disconnect();
          }
        }
      }

      this.connectedUsers.set(socket.id, user._id.toString());
      this.connectedUsersDetailed.set(socket.id, user);
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

    if (data.chatType === 'personal') {
      // Personal chat: Send only to receiver
      for (const [socketId, userId] of this.connectedUsers.entries()) {
        const receiverId = savedMessage.receiver.toString();
        if (userId.toString() === receiverId) {
          client.to(socketId).emit('receiveMessage', savedMessage);
        }
      }
    } else if (data.chatType === 'group') {
      const isSenderAdmin = senderUser.role?.type === 'admin';

      for (const [socketId, user] of this.connectedUsersDetailed.entries()) {
        if (user._id === senderUser._id) continue; // Skip sender

        const isUserAdmin = user.role?.type === 'admin';

        const replyToUserId =
          typeof savedMessage.replyToUser === 'object' &&
          savedMessage.replyToUser?._id?.toString();

        const isTargetUser = replyToUserId === user._id.toString();
        const isPublic = savedMessage.visibility === 'public';

        // ✅ Admin public message → everyone gets it
        if (isSenderAdmin && isPublic) {
          client.to(socketId).emit('receiveMessage', savedMessage);
          continue;
        }

        // ✅ Admin private reply → only to replyToUser + admins
        if (isSenderAdmin && !isPublic) {
          if (isUserAdmin || isTargetUser) {
            client.to(socketId).emit('receiveMessage', savedMessage);
          }
          continue;
        }

        // ✅ User public message → all users
        if (!isSenderAdmin && isPublic) {
          client.to(socketId).emit('receiveMessage', savedMessage);
          continue;
        }

        // ✅ User private reply → only to replyToUser + admins
        if (!isSenderAdmin && !isPublic) {
          if (isUserAdmin || isTargetUser) {
            client.to(socketId).emit('receiveMessage', savedMessage);
          }
          continue;
        }
      }
    }

    client.emit('messageSent', savedMessage);
  }
}

/*

else if (data.chatType === 'group') {
      // Group chat behavior based on sender's role
      for (const [socketId, user] of this.connectedUsersDetailed.entries()) {
        if (user._id === senderUser._id) continue; // Skip sender

        if (
          savedMessage?.replyToUser?._id &&
          savedMessage?.replyToUser?._id?.toString() === user?._id?.toString()
        ) {
          continue;
        }

        console.log({ savedMessage, user, senderUser });
        const isSenderAdmin = senderUser.role?.type === 'admin';
        const isUserAdmin = user.role?.type === 'admin';

        if (isSenderAdmin) {
          // Admin sends: broadcast to all users except self
          client.to(socketId).emit('receiveMessage', savedMessage);
        } else if (isUserAdmin) {
          // User sends: only admins receive the message
          client.to(socketId).emit('receiveMessage', savedMessage);
        }
      }
    }

else if (data.chatType === 'group') {
  const isSenderAdmin = senderUser.role?.type === 'admin';

  for (const [socketId, user] of this.connectedUsersDetailed.entries()) {
    if (user._id === senderUser._id) continue; // Skip sender

    const isUserAdmin = user.role?.type === 'admin';

    const replyToUserId =
      typeof savedMessage.replyToUser === 'object'
        ? savedMessage.replyToUser?._id?.toString()
        : savedMessage.replyToUser?.toString();

    const isTargetUser = replyToUserId === user._id.toString();
    const isPublic = savedMessage.visibility === 'public';

    // ✅ Admin public message → everyone gets it
    if (isSenderAdmin && isPublic) {
      client.to(socketId).emit('receiveMessage', savedMessage);
      continue;
    }

    // ✅ Admin private reply → only to replyToUser + admins
    if (isSenderAdmin && !isPublic) {
      if (isUserAdmin || isTargetUser) {
        client.to(socketId).emit('receiveMessage', savedMessage);
      }
      continue;
    }

    // ✅ User public message → all users
    if (!isSenderAdmin && isPublic) {
      client.to(socketId).emit('receiveMessage', savedMessage);
      continue;
    }

    // ✅ User private reply → only to replyToUser + admins
    if (!isSenderAdmin && !isPublic) {
      if (isUserAdmin || isTargetUser) {
        client.to(socketId).emit('receiveMessage', savedMessage);
      }
      continue;
    }
  }
}

client.emit('messageSent', savedMessage);



else if (data.chatType === 'group') {
      // Group chat behavior based on sender's role
      for (const [socketId, user] of this.connectedUsersDetailed.entries()) {
        if (user._id === senderUser._id) continue; // Skip sender

        const isSenderAdmin = senderUser.role?.type === 'admin';
        const isUserAdmin = user.role?.type === 'admin';

        if (isSenderAdmin) {
          // Admin sends: broadcast to all users except self
          client.to(socketId).emit('receiveMessage', savedMessage);
        } else if (isUserAdmin) {
          // User sends: only admins receive the message
          client.to(socketId).emit('receiveMessage', savedMessage);
        }
      }
    }
*/
