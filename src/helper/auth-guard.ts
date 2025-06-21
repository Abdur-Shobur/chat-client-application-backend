import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, CanActivate } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/role/decorator/role.enum';
import { DevPermissionSubCategoryService } from 'src/dev-permission-sub-category/dev-permission-sub-category.service';
import {
  IDevPermissionSubCategory,
  IDevPermissionSubCategoryStatus,
} from 'src/dev-permission-sub-category/interfaces/dev-permission-sub-category.interfaces';

@Injectable()
export class AuthOnlyPermission implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService, // inject the user service
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decoded = this.jwtService.verify(token);

      // Check if the user exists in the database
      const user: any = await this.userService.findById(decoded._id);
      // Attach the user to the request object
      request.user = user;

      if (!user) {
        throw new UnauthorizedException('Access denied');
      }
      const requiredRoles = this.reflector.get<Role[]>(
        'roles',
        context.getHandler(),
      );

      const permissions = user?.role?.permissions;

      // No roles specified, allow access
      if (!requiredRoles) {
        return true;
      }

      // Check if user role matches the required roles
      const hasAccess = hasPermission(
        permissions,
        requiredRoles,
        IDevPermissionSubCategoryStatus.ForLoginUser,
      );

      if (hasAccess) {
        return true;
      } else {
        throw new ForbiddenException('Access denied due to role mismatch');
      }
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Invalid token');
    }
  }
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService, // inject the user service
    private reflector: Reflector,
    private readonly devPermissionSubCategoryService: DevPermissionSubCategoryService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);

        // Check if the user exists in the database
        const user: any = await this.userService.findById(decoded._id);
        // Attach the user to the request object
        request.user = user;

        if (!user && user.status !== 'active') {
          throw new UnauthorizedException('User not found or inactive');
        }
        const requiredRoles = this.reflector.get<Role[]>(
          'roles',
          context.getHandler(),
        );

        const permissions = user?.role?.permissions;

        // No roles specified, allow access
        if (!requiredRoles) {
          return true;
        }

        // Check if user role matches the required roles
        const hasAccess = hasPermission(
          permissions,
          requiredRoles,
          IDevPermissionSubCategoryStatus.ForLoginUser,
        );

        if (hasAccess) {
          return true;
        } else {
          throw new ForbiddenException('Access denied');
        }
      } catch (error) {
        throw new UnauthorizedException(error.message || 'Invalid token');
      }
    } else {
      try {
        const requiredRoles = this.reflector.get<Role[]>(
          'roles',
          context.getHandler(),
        );
        const permissions: IDevPermissionSubCategory[] =
          await this.devPermissionSubCategoryService.findAll();

        // Check if user role matches the required roles
        const hasAccess = hasPermission(
          permissions,
          requiredRoles,
          IDevPermissionSubCategoryStatus.ForAnyOne,
        );

        if (hasAccess) {
          return true;
        } else {
          throw new UnauthorizedException('Unauthorized');
        }
      } catch (error) {
        throw new UnauthorizedException(error.message || 'Invalid token');
      }
    }
  }
}

// function hasPermission(
//   userPermissions: {
//     _id?: string;
//     name?: string;
//     permissionKey?: string;
//     status?: string;
//   }[],
//   requiredPermissions: string | string[],
//   status: IDevPermissionSubCategoryStatus,
// ): boolean {
//   // Ensure `requiredPermissions` is an array
//   const permissionsToCheck = Array.isArray(requiredPermissions)
//     ? requiredPermissions
//     : [requiredPermissions];

//   // Check if any of the required permissions exist in the user's permissions array
//   return permissionsToCheck.every((key) =>
//     userPermissions.some(
//       (permission) =>
//         permission.permissionKey === key && permission.status === status,
//     ),
//   );
// }

function hasPermission(
  userPermissions: {
    _id?: string;
    name?: string;
    permissionKey?: string;
    status?: string;
  }[],
  requiredPermissions: string | string[],
  status: IDevPermissionSubCategoryStatus,
): boolean {
  const permissionsToCheck = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions];

  return permissionsToCheck.every((key) =>
    userPermissions.some((permission) => {
      if (permission.permissionKey !== key) return false;

      // Allow "ForLoginUser" to access both "active" and "anyone" status
      if (status === IDevPermissionSubCategoryStatus.ForLoginUser) {
        return (
          permission.status === IDevPermissionSubCategoryStatus.ForLoginUser ||
          permission.status === IDevPermissionSubCategoryStatus.ForAnyOne
        );
      }

      // Otherwise, check for exact status match
      return permission.status === status;
    }),
  );
}
