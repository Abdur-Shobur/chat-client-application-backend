import { IUser, IUserStatus } from '../interfaces/user.interfaces';
export declare class CreateUserDto implements IUser {
    name: string;
    email: string;
    phone: string;
    role: string;
    password: string;
    status?: IUserStatus;
}
