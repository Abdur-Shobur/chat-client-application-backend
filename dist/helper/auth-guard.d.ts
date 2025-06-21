import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, CanActivate } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Reflector } from '@nestjs/core';
import { DevPermissionSubCategoryService } from 'src/dev-permission-sub-category/dev-permission-sub-category.service';
export declare class AuthOnlyPermission implements CanActivate {
    private readonly jwtService;
    private readonly userService;
    private reflector;
    constructor(jwtService: JwtService, userService: UserService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly userService;
    private reflector;
    private readonly devPermissionSubCategoryService;
    constructor(jwtService: JwtService, userService: UserService, reflector: Reflector, devPermissionSubCategoryService: DevPermissionSubCategoryService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
