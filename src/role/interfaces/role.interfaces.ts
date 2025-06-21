export interface IRole {
  name?: string;
  type?: IRoleType; // admin, user
  permissions?: string[]; // sub category items
  description?: string;
  status?: IRoleStatus;
  position?: number;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}

// for status
export enum IRoleStatus {
  Active = 'active',
  Inactive = 'inactive',
  Deleted = 'deleted',
}

export enum IRoleType {
  Admin = 'admin',
  User = 'user',
}
