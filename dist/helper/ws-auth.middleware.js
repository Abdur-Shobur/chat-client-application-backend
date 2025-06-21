"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWsMiddleware = AuthWsMiddleware;
function AuthWsMiddleware(jwtService, configService, userService) {
    return async (socket, next) => {
        const token = socket.handshake.auth?.token ||
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
            socket.data.user = user;
            return next();
        }
        catch (err) {
            return next(new Error('Unauthorized: Invalid token'));
        }
    };
}
//# sourceMappingURL=ws-auth.middleware.js.map