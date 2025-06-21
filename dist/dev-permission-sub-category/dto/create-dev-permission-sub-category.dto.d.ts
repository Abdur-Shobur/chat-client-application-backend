import { IDevPermissionSubCategory, IDevPermissionSubCategoryStatus } from '../interfaces/dev-permission-sub-category.interfaces';
export declare class CreateDevPermissionSubCategoryDto implements IDevPermissionSubCategory {
    name: string;
    category: string;
    permissionKey: string;
    description: string;
    status?: IDevPermissionSubCategoryStatus;
}
