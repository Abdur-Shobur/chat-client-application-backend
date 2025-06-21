import { IRole, IRoleStatus, IRoleType } from '../interfaces/role.interfaces';
export declare class CreateRoleDto implements IRole {
    name: string;
    type: IRoleType;
    permissions: string[];
    description: string;
    status?: IRoleStatus;
}
