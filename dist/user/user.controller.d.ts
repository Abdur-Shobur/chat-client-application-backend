import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(req: any, status?: string): Promise<import("../type").IApiResponse<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>>;
    findOne(id: string): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    create(createUserDto: CreateUserDto): Promise<import("../type").IApiResponse<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>>>;
    updateStatus(id: string, updateStatusDto: UpdateStatusDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>>;
    delete(id: string): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
}
