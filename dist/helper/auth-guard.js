"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = exports.AuthOnlyPermission = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const core_1 = require("@nestjs/core");
const dev_permission_sub_category_service_1 = require("../dev-permission-sub-category/dev-permission-sub-category.service");
const dev_permission_sub_category_interfaces_1 = require("../dev-permission-sub-category/interfaces/dev-permission-sub-category.interfaces");
let AuthOnlyPermission = class AuthOnlyPermission {
    constructor(jwtService, userService, reflector) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Token is missing');
        }
        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.userService.findById(decoded._id);
            request.user = user;
            if (!user) {
                throw new common_1.UnauthorizedException('Access denied');
            }
            const requiredRoles = this.reflector.get('roles', context.getHandler());
            const permissions = user?.role?.permissions;
            if (!requiredRoles) {
                return true;
            }
            const hasAccess = hasPermission(permissions, requiredRoles, dev_permission_sub_category_interfaces_1.IDevPermissionSubCategoryStatus.ForLoginUser);
            if (hasAccess) {
                return true;
            }
            else {
                throw new common_1.ForbiddenException('Access denied due to role mismatch');
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message || 'Invalid token');
        }
    }
};
exports.AuthOnlyPermission = AuthOnlyPermission;
exports.AuthOnlyPermission = AuthOnlyPermission = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        core_1.Reflector])
], AuthOnlyPermission);
let AuthGuard = class AuthGuard {
    constructor(jwtService, userService, reflector, devPermissionSubCategoryService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.reflector = reflector;
        this.devPermissionSubCategoryService = devPermissionSubCategoryService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1];
        if (token) {
            try {
                const decoded = this.jwtService.verify(token);
                const user = await this.userService.findById(decoded._id);
                request.user = user;
                if (!user && user.status !== 'active') {
                    throw new common_1.UnauthorizedException('User not found or inactive');
                }
                const requiredRoles = this.reflector.get('roles', context.getHandler());
                const permissions = user?.role?.permissions;
                if (!requiredRoles) {
                    return true;
                }
                const hasAccess = hasPermission(permissions, requiredRoles, dev_permission_sub_category_interfaces_1.IDevPermissionSubCategoryStatus.ForLoginUser);
                if (hasAccess) {
                    return true;
                }
                else {
                    throw new common_1.ForbiddenException('Access denied');
                }
            }
            catch (error) {
                throw new common_1.UnauthorizedException(error.message || 'Invalid token');
            }
        }
        else {
            try {
                const requiredRoles = this.reflector.get('roles', context.getHandler());
                const permissions = await this.devPermissionSubCategoryService.findAll();
                const hasAccess = hasPermission(permissions, requiredRoles, dev_permission_sub_category_interfaces_1.IDevPermissionSubCategoryStatus.ForAnyOne);
                if (hasAccess) {
                    return true;
                }
                else {
                    throw new common_1.UnauthorizedException('Unauthorized');
                }
            }
            catch (error) {
                throw new common_1.UnauthorizedException(error.message || 'Invalid token');
            }
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        core_1.Reflector,
        dev_permission_sub_category_service_1.DevPermissionSubCategoryService])
], AuthGuard);
function hasPermission(userPermissions, requiredPermissions, status) {
    const permissionsToCheck = Array.isArray(requiredPermissions)
        ? requiredPermissions
        : [requiredPermissions];
    return permissionsToCheck.every((key) => userPermissions.some((permission) => {
        if (permission.permissionKey !== key)
            return false;
        if (status === dev_permission_sub_category_interfaces_1.IDevPermissionSubCategoryStatus.ForLoginUser) {
            return (permission.status === dev_permission_sub_category_interfaces_1.IDevPermissionSubCategoryStatus.ForLoginUser ||
                permission.status === dev_permission_sub_category_interfaces_1.IDevPermissionSubCategoryStatus.ForAnyOne);
        }
        return permission.status === status;
    }));
}
//# sourceMappingURL=auth-guard.js.map