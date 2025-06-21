export interface IDevPermissionSubCategory {
    name?: string;
    permissionKey?: string;
    category?: string;
    description?: string;
    status?: IDevPermissionSubCategoryStatus;
    position?: number;
    createdAt?: Date;
    updatedAt?: Date;
    _id?: string;
}
export declare enum IDevPermissionSubCategoryStatus {
    ForLoginUser = "active",
    ForAnyOne = "anyone",
    Inactive = "inactive",
    Deleted = "deleted"
}
