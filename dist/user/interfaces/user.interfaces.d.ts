export interface IUser {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    status?: IUserStatus;
    position?: number;
    createdAt?: Date;
    updatedAt?: Date;
    _id?: string;
}
export declare enum IUserStatus {
    Active = "active",
    Inactive = "inactive",
    Deleted = "deleted"
}
