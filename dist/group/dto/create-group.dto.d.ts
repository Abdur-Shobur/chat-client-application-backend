import { IGroupStatus } from '../interfaces/group.interfaces';
export declare class CreateGroupDto {
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
    tags?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    status?: IGroupStatus;
}
