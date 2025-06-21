export interface ITag {
    name?: string;
    status?: ITagStatus;
    position?: number;
    createdAt?: Date;
    updatedAt?: Date;
    _id?: string;
}
export declare enum ITagStatus {
    Active = "active",
    Inactive = "inactive",
    Deleted = "deleted"
}
