import { DevPermissionCategoryService } from './dev-permission-category.service';
import { CreateDevPermissionCategoryDto } from './dto/create-dev-permission-category.dto';
import { UpdateDevPermissionCategoryDto } from './dto/update-dev-permission-category.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class DevPermissionCategoryController {
    private readonly DevPermissionCategoryService;
    constructor(DevPermissionCategoryService: DevPermissionCategoryService);
    create(createDevPermissionCategoryDto: CreateDevPermissionCategoryDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/dev-permission-category.schema").DevPermissionCategory, {}> & import("./schemas/dev-permission-category.schema").DevPermissionCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    findAll(status?: string): Promise<import("../type").IApiResponse<any[]>>;
    findOne(id: string): Promise<import("../type").IApiResponse<import("mongoose").FlattenMaps<{
        name: string;
        permissionKey: string;
        description: string;
        position: number;
        status?: import("./interfaces/dev-permission-category.interfaces").IDevPermissionCategoryStatus;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    update(id: string, updateDevPermissionCategoryDto: UpdateDevPermissionCategoryDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/dev-permission-category.schema").DevPermissionCategory, {}> & import("./schemas/dev-permission-category.schema").DevPermissionCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    updateStatus(id: string, updateStatusDto: UpdateStatusDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/dev-permission-category.schema").DevPermissionCategory, {}> & import("./schemas/dev-permission-category.schema").DevPermissionCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    remove(id: string): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/dev-permission-category.schema").DevPermissionCategory, {}> & import("./schemas/dev-permission-category.schema").DevPermissionCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
}
