export interface ITag {
  name?: string;
  status?: ITagStatus;
  position?: number;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
}

// for menu status
export enum ITagStatus {
  Active = 'active',
  Inactive = 'inactive',
  Deleted = 'deleted',
}
