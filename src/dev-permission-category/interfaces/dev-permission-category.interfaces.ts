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

// for menu status
export enum IDevPermissionCategoryStatus {
  Active = 'active',
  Inactive = 'inactive',
  Deleted = 'deleted',
}
