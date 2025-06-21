import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { JoinGroupDto } from './dto/join-group.dto';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    create(req: any, createGroupDto: CreateGroupDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/group.schema").Group, {}> & import("./schemas/group.schema").Group & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, import("./schemas/group.schema").Group, {}> & import("./schemas/group.schema").Group & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>>;
    findAll(joinType?: 'public' | 'private'): Promise<import("../type").IApiResponse<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/group.schema").Group, {}> & import("./schemas/group.schema").Group & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>>;
    myGroups(req: any): Promise<import("../type").IApiResponse<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/group.schema").Group, {}> & import("./schemas/group.schema").Group & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, import("./schemas/group.schema").Group, {}> & import("./schemas/group.schema").Group & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>>;
    joinGroup(dto: JoinGroupDto, req: any): Promise<import("../type").IApiResponse<{
        message: string;
    }>>;
    findOne(id: string): Promise<import("../type").IApiResponse<import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/group.schema").Group, {}> & import("./schemas/group.schema").Group & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/group.schema").Group, {}> & import("./schemas/group.schema").Group & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, import("./schemas/group.schema").Group, {}> & import("./schemas/group.schema").Group & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>>;
    updateStatus(id: string, updateStatusDto: UpdateStatusDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/group.schema").Group, {}> & import("./schemas/group.schema").Group & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, import("./schemas/group.schema").Group, {}> & import("./schemas/group.schema").Group & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>>;
    remove(id: string): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/group.schema").Group, {}> & import("./schemas/group.schema").Group & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}> & import("mongoose").Document<unknown, {}, import("./schemas/group.schema").Group, {}> & import("./schemas/group.schema").Group & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>>;
}
