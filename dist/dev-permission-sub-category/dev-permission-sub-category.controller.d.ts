import { DevPermissionSubCategoryService } from './dev-permission-sub-category.service';
import { CreateDevPermissionSubCategoryDto } from './dto/create-dev-permission-sub-category.dto';
import { UpdateDevPermissionSubCategoryDto } from './dto/update-dev-permission-sub-category.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class DevPermissionSubCategoryController {
    private readonly DevPermissionSubCategoryService;
    constructor(DevPermissionSubCategoryService: DevPermissionSubCategoryService);
    create(createDevPermissionSubCategoryDto: CreateDevPermissionSubCategoryDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/dev-permission-sub-category.schema").DevPermissionSubCategory, {}> & import("./schemas/dev-permission-sub-category.schema").DevPermissionSubCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    findAll(status?: string): Promise<import("../type").IApiResponse<any>>;
    findAllPermissionAway(): Promise<import("../type").IApiResponse<any>>;
    findOne(id: string): Promise<import("../type").IApiResponse<import("mongoose").FlattenMaps<{
        name: string;
        category: string;
        permissionKey: string;
        description: string;
        position: number;
        status?: import("./interfaces/dev-permission-sub-category.interfaces").IDevPermissionSubCategoryStatus;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    update(id: string, updateDevPermissionSubCategoryDto: UpdateDevPermissionSubCategoryDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/dev-permission-sub-category.schema").DevPermissionSubCategory, {}> & import("./schemas/dev-permission-sub-category.schema").DevPermissionSubCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    updateStatus(id: string, updateStatusDto: UpdateStatusDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/dev-permission-sub-category.schema").DevPermissionSubCategory, {}> & import("./schemas/dev-permission-sub-category.schema").DevPermissionSubCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    remove(id: string): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/dev-permission-sub-category.schema").DevPermissionSubCategory, {}> & import("./schemas/dev-permission-sub-category.schema").DevPermissionSubCategory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
}
