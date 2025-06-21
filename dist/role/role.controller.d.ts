import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class RoleController {
    private readonly RoleService;
    constructor(RoleService: RoleService);
    create(createRoleDto: CreateRoleDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/role.schema").Role, {}> & import("./schemas/role.schema").Role & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    findAll(status?: string): Promise<import("../type").IApiResponse<any>>;
    findOne(id: string): Promise<import("../type").IApiResponse<import("mongoose").FlattenMaps<{
        name: string;
        type: import("./interfaces/role.interfaces").IRoleType;
        permissions: string[];
        description: string;
        position: number;
        status?: import("./interfaces/role.interfaces").IRoleStatus;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/role.schema").Role, {}> & import("./schemas/role.schema").Role & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    updateStatus(id: string, updateStatusDto: UpdateStatusDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/role.schema").Role, {}> & import("./schemas/role.schema").Role & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    remove(id: string): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/role.schema").Role, {}> & import("./schemas/role.schema").Role & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
}
