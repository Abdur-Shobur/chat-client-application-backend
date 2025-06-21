export interface IRole {
    name?: string;
    type?: IRoleType;
    permissions?: string[];
    description?: string;
    status?: IRoleStatus;
    position?: number;
    createdAt?: Date;
    updatedAt?: Date;
    _id?: string;
}
export declare enum IRoleStatus {
    Active = "active",
    Inactive = "inactive",
    Deleted = "deleted"
}
export declare enum IRoleType {
    Admin = "admin",
    User = "user"
}
