import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CustomConfigService } from 'src/config';
export declare function AuthWsMiddleware(jwtService: JwtService, configService: CustomConfigService, userService: UserService): (socket: Socket, next: (err?: any) => void) => Promise<void>;
