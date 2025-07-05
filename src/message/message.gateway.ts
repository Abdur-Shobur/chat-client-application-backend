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

  // Add these methods to your MessageGateway class
  @SubscribeMessage('getActiveUsers')
  handleGetActiveUsers(@ConnectedSocket() client: Socket) {
    const users = Array.from(this.connectedUsersDetailed.values()).map(
      (user) => ({
        _id: user._id,
        name: user.name,
        role: user.role,
        // Add online status or last seen if needed
        isOnline: true,
      }),
    );

    client.emit('activeUsers', users);
  }

  // Broadcast active users to all connected clients
  private broadcastActiveUsers() {
    const users = Array.from(this.connectedUsersDetailed.values()).map(
      (user) => ({
        _id: user._id,
        name: user.name,
        role: user.role,
        isOnline: true,
      }),
    );

    this.server.emit('activeUsersUpdated', users);
  }

  // Enhanced handleConnection to broadcast user list updates
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

      this.configService.isDevelopment &&
        console.log(`Client connected: ${socket.id} (userId: ${user._id})`);

      // Broadcast updated user list to all clients
      this.broadcastActiveUsers();
    } else {
      console.warn(`Unauthorized socket tried to connect: ${socket.id}`);
      socket.disconnect();
    }
  }

  // Enhanced handleDisconnect to broadcast user list updates
  handleDisconnect(socket: Socket) {
    const userId = this.connectedUsers.get(socket.id);
    this.configService.isDevelopment &&
      console.log(`Client disconnected: ${socket.id} (userId: ${userId})`);

    this.connectedUsers.delete(socket.id);
    this.connectedUsersDetailed.delete(socket.id);

    // Broadcast updated user list to all clients
    this.broadcastActiveUsers();
  }

  // Check if specific user is online
  @SubscribeMessage('checkUserOnline')
  handleCheckUserOnline(
    @MessageBody() data: { userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const isOnline = Array.from(this.connectedUsersDetailed.values()).some(
      (user) => user._id.toString() === data.userId,
    );

    client.emit('userOnlineStatus', {
      userId: data.userId,
      isOnline,
    });
  }
  afterInit(server: Server) {
    this.server = server; // Store the server instance

    this.configService.isDevelopment &&
      console.log('WebSocket Server Initialized');

    server.use(
      AuthWsMiddleware(this.jwtService, this.configService, this.userService),
    );
  }
  // handleConnection(socket: Socket) {
  //   const user = socket.data.user;
  //   if (user) {
  //     // Disconnect any existing sockets for this user
  //     for (const [sockId, userId] of this.connectedUsers.entries()) {
  //       if (userId === user._id.toString()) {
  //         const existingSocket = this.server.sockets.sockets.get(sockId);
  //         if (existingSocket && existingSocket.id !== socket.id) {
  //           existingSocket.disconnect();
  //         }
  //       }
  //     }

  //     this.connectedUsers.set(socket.id, user._id.toString());
  //     this.connectedUsersDetailed.set(socket.id, user);

  //     this.configService.isDevelopment &&
  //       console.log(`Client connected: ${socket.id} (userId: ${user._id})`);
  //   } else {
  //     console.warn(`Unauthorized socket tried to connect: ${socket.id}`);
  //     socket.disconnect();
  //   }
  // }

  // handleDisconnect(socket: Socket) {
  //   const userId = this.connectedUsers.get(socket.id);
  //   this.configService.isDevelopment &&
  //     console.log(`Client disconnected: ${socket.id} (userId: ${userId})`);
  //   this.connectedUsers.delete(socket.id);
  // }
  /*
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
      const groupMembers = await this.groupService.findOne(
        savedMessage.receiver.toString(),
      );
      const groupMem = groupMembers.members as any[]; //{ _id: string }[]

      for (const [socketId, user] of this.connectedUsersDetailed.entries()) {
        if (user._id === senderUser._id) continue; // Skip sender

        const isUserAdmin = user.role?.type === 'admin';

        const isGroupMember = groupMem.some(
          (member) => member._id.toString() === user._id.toString(),
        );

        if (!isGroupMember) continue;

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
  */

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
      const groupMembers = await this.groupService.findOne(
        savedMessage.receiver.toString(),
      );
      const groupMem = groupMembers.members as any[]; //{ _id: string }[]

      for (const [socketId, user] of this.connectedUsersDetailed.entries()) {
        if (user._id === senderUser._id) continue; // Skip sender (we'll emit to sender later)

        const isUserAdmin = user.role?.type === 'admin';

        const isGroupMember = groupMem.some(
          (member) => member._id.toString() === user._id.toString(),
        );

        if (!isGroupMember) continue;

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

    // ✅ Send the actual savedMessage (with correct _id) to the sender too
    client.emit('receiveMessage', savedMessage);
  }

  @SubscribeMessage('toggleVisibility')
  async handleToggleVisibility(
    @MessageBody()
    data: { messageId: string; visibility: 'public' | 'private' },
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;
    if (!user) {
      client.emit('unauthorized');
      return;
    }

    // Update visibility in DB
    const updatedMessage = await this.messageService.toggleVisibility(
      data.messageId,
    );

    console.log(updatedMessage);
    if (!updatedMessage) {
      client.emit('error', { message: 'Message not found or update failed' });
      return;
    }

    // ✅ Broadcast visibility update to everyone (since frontend will refetch anyway)
    this.server.emit('visibilityUpdated', {
      messageId: updatedMessage._id,
      visibility: updatedMessage.visibility,
      sender: updatedMessage.sender,
      text: updatedMessage.text,
      createdAt: updatedMessage.createdAt,
    });

    // ✅ Acknowledge back to sender
    client.emit('visibilityToggled', {
      messageId: updatedMessage._id,
      visibility: updatedMessage.visibility,
    });
  }

  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(
    @MessageBody() data: { messageId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;
    if (!user) {
      client.emit('unauthorized');
      return;
    }

    // Delete the message
    const deletedMessage = await this.messageService.remove(data.messageId);
    if (!deletedMessage) {
      client.emit('error', { message: 'Message not found or delete failed' });
      return;
    }

    // Broadcast to all clients
    this.server.emit('messageDeleted', { messageId: data.messageId });

    // Optional: acknowledge the sender
    client.emit('messageDeleteSuccess', { messageId: data.messageId });
  }
}
