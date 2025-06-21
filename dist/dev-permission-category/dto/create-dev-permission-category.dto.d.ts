import { IDevPermissionCategory, IDevPermissionCategoryStatus } from '../interfaces/dev-permission-category.interfaces';
export declare class CreateDevPermissionCategoryDto implements IDevPermissionCategory {
    name: string;
    permissionKey: string;
    description: string;
    status?: IDevPermissionCategoryStatus;
}
