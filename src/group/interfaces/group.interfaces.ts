export interface IGroup {
  name: string;
  description: string;
  iconUrl?: string;
  createdBy: string;
  joinType?: 'public' | 'private';
  joinLink?: string;
  joinApprovalType?: 'auto' | 'admin';
  welcomeMessage: string;
  members?: string[];
  pendingMembers?: string[];
  leaveMembers?: string[];
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
  status?: IGroupStatus;
}
// for   status
export enum IGroupStatus {
  Active = 'active',
  Inactive = 'inactive',
  Deleted = 'deleted',
}
