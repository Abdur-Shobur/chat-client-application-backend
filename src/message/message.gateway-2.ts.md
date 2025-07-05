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
  private server: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly jwtService: JwtService,
    private readonly configService: CustomConfigService,
  ) {}

  @SubscribeMessage('getActiveUsers')
  handleGetActiveUsers(@ConnectedSocket() client: Socket) {
    const users = Array.from(this.connectedUsersDetailed.values()).map(
      (user) => ({
        _id: user._id,
        name: user.name,
        role: user.role,
        isOnline: true,
      }),
    );

    client.emit('activeUsers', users);
  }

  // NEW: Get active members count for a specific group
  @SubscribeMessage('getGroupActiveMembersCount')
  async handleGetGroupActiveMembersCount(
    @MessageBody() data: { groupId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const group = await this.groupService.findOne(data.groupId);
      if (!group) {
        client.emit('error', { message: 'Group not found' });
        return;
      }

      const groupMembers = group.members as any[]; // Array of member objects with _id
      const activeMembers = Array.from(
        this.connectedUsersDetailed.values(),
      ).filter((connectedUser) =>
        groupMembers.some(
          (member) => member._id.toString() === connectedUser._id.toString(),
        ),
      );

      const activeMembersCount = activeMembers.length;

      client.emit('groupActiveMembersCount', {
        groupId: data.groupId,
        count: activeMembersCount,
        activeMembers: activeMembers.map((user) => ({
          _id: user._id,
          name: user.name,
          role: user.role,
        })),
      });
    } catch (error) {
      client.emit('error', {
        message: 'Failed to get group active members count',
      });
    }
  }

  // NEW: Get active members list for a specific group
  @SubscribeMessage('getGroupActiveMembers')
  async handleGetGroupActiveMembers(
    @MessageBody() data: { groupId: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const group = await this.groupService.findOne(data.groupId);
      if (!group) {
        client.emit('error', { message: 'Group not found' });
        return;
      }

      const groupMembers = group.members as any[];
      const activeMembers = Array.from(
        this.connectedUsersDetailed.values(),
      ).filter((connectedUser) =>
        groupMembers.some(
          (member) => member._id.toString() === connectedUser._id.toString(),
        ),
      );

      client.emit('groupActiveMembers', {
        groupId: data.groupId,
        activeMembers: activeMembers.map((user) => ({
          _id: user._id,
          name: user.name,
          role: user.role,
          isOnline: true,
        })),
      });
    } catch (error) {
      client.emit('error', { message: 'Failed to get group active members' });
    }
  }

  // NEW: Broadcast group active members count to all group members
  private async broadcastGroupActiveMembersCount(groupId: string) {
    try {
      const group = await this.groupService.findOne(groupId);
      if (!group) return;

      const groupMembers = group.members as any[];
      const activeMembers = Array.from(
        this.connectedUsersDetailed.values(),
      ).filter((connectedUser) =>
        groupMembers.some(
          (member) => member._id.toString() === connectedUser._id.toString(),
        ),
      );

      const activeMembersCount = activeMembers.length;

      // Emit to all connected group members
      for (const [socketId, user] of this.connectedUsersDetailed.entries()) {
        const isGroupMember = groupMembers.some(
          (member) => member._id.toString() === user._id.toString(),
        );

        if (isGroupMember) {
          this.server.to(socketId).emit('groupActiveMembersCountUpdated', {
            groupId,
            count: activeMembersCount,
            activeMembers: activeMembers.map((u) => ({
              _id: u._id,
              name: u.name,
              role: u.role,
            })),
          });
        }
      }
    } catch (error) {
      console.error('Error broadcasting group active members count:', error);
    }
  }

  // NEW: Broadcast active members count for all groups when user connects/disconnects
  private async broadcastAllGroupsActiveMembersCount() {
    try {
      // Get all groups (you might want to cache this or limit it)
      const allGroups = await this.groupService.findAll(); // Assuming this method exists

      for (const group of allGroups) {
        await this.broadcastGroupActiveMembersCount(group._id.toString());
      }
    } catch (error) {
      console.error(
        'Error broadcasting all groups active members count:',
        error,
      );
    }
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

      // NEW: Broadcast updated group active members count
      this.broadcastAllGroupsActiveMembersCount();
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

    // NEW: Broadcast updated group active members count
    this.broadcastAllGroupsActiveMembersCount();
  }

  // Get active users count
  @SubscribeMessage('getActiveUsersCount')
  handleGetActiveUsersCount(@ConnectedSocket() client: Socket) {
    const count = this.connectedUsersDetailed.size;
    client.emit('activeUsersCount', count);
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
    this.server = server;

    this.configService.isDevelopment &&
      console.log('WebSocket Server Initialized');

    server.use(
      AuthWsMiddleware(this.jwtService, this.configService, this.userService),
    );
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
      const groupMembers = await this.groupService.findOne(
        savedMessage.receiver.toString(),
      );
      const groupMem = groupMembers.members as any[];

      for (const [socketId, user] of this.connectedUsersDetailed.entries()) {
        if (user._id === senderUser._id) continue;

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

        if (isSenderAdmin && isPublic) {
          client.to(socketId).emit('receiveMessage', savedMessage);
          continue;
        }

        if (isSenderAdmin && !isPublic) {
          if (isUserAdmin || isTargetUser) {
            client.to(socketId).emit('receiveMessage', savedMessage);
          }
          continue;
        }

        if (!isSenderAdmin && isPublic) {
          client.to(socketId).emit('receiveMessage', savedMessage);
          continue;
        }

        if (!isSenderAdmin && !isPublic) {
          if (isUserAdmin || isTargetUser) {
            client.to(socketId).emit('receiveMessage', savedMessage);
          }
          continue;
        }
      }
    }

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

    const updatedMessage = await this.messageService.toggleVisibility(
      data.messageId,
    );
    if (!updatedMessage) {
      client.emit('error', { message: 'Message not found or update failed' });
      return;
    }

    this.server.emit('visibilityUpdated', {
      messageId: updatedMessage._id,
      visibility: updatedMessage.visibility,
    });

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

    const deletedMessage = await this.messageService.remove(data.messageId);
    if (!deletedMessage) {
      client.emit('error', { message: 'Message not found or delete failed' });
      return;
    }

    this.server.emit('messageDeleted', { messageId: data.messageId });
    client.emit('messageDeleteSuccess', { messageId: data.messageId });
  }
}
```
