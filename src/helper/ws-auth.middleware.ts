// src/helper/ws-auth.middleware.ts
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CustomConfigService } from 'src/config';

export function AuthWsMiddleware(
  jwtService: JwtService,
  configService: CustomConfigService,
  userService: UserService,
) {
  return async (socket: Socket, next: (err?: any) => void) => {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.split(' ')[1];

    if (!token) {
      return next(new Error('Unauthorized: No token provided'));
    }

    try {
      const payload = jwtService.verify(token, {
        secret: configService.jwtSecret,
      });

      const user = await userService.findById(payload._id);
      if (!user) {
        return next(new Error('Unauthorized: User not found'));
      }

      socket.data.user = user; // Attach user to socket for use in handlers
      return next();
    } catch (err) {
      return next(new Error('Unauthorized: Invalid token'));
    }
  };
}
