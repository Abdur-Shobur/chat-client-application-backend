import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UserService } from 'src/user/user.service';
import { GroupService } from 'src/group/group.service';
import { JwtService } from '@nestjs/jwt';
import { CustomConfigService } from 'src/config';
export declare class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly messageService;
    private readonly userService;
    private readonly groupService;
    private readonly jwtService;
    private readonly configService;
    private connectedUsers;
    constructor(messageService: MessageService, userService: UserService, groupService: GroupService, jwtService: JwtService, configService: CustomConfigService);
    afterInit(server: Server): void;
    handleConnection(socket: Socket): void;
    handleDisconnect(socket: Socket): void;
    handleSendMessage(data: CreateMessageDto, client: Socket): Promise<void>;
}
