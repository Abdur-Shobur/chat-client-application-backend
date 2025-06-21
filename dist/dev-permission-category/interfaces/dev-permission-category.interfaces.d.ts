export interface IDevPermissionCategory {
    name?: string;
    permissionKey?: string;
    description?: string;
    status?: IDevPermissionCategoryStatus;
    position?: number;
    createdAt?: Date;
    updatedAt?: Date;
    _id?: string;
}
export declare enum IDevPermissionCategoryStatus {
    Active = "active",
    Inactive = "inactive",
    Deleted = "deleted"
}
