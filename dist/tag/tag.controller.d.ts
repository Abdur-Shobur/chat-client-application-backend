import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
export declare class TagController {
    private readonly tagService;
    constructor(tagService: TagService);
    create(createTagDto: CreateTagDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/tag.schema").Tag, {}> & import("./schemas/tag.schema").Tag & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    findAll(status?: string): Promise<import("../type").IApiResponse<any>>;
    findOne(id: string): Promise<import("../type").IApiResponse<import("mongoose").FlattenMaps<{
        name: string;
        position: number;
        status?: import("./interfaces/tag.interfaces").ITagStatus;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    update(id: string, updateTagDto: UpdateTagDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/tag.schema").Tag, {}> & import("./schemas/tag.schema").Tag & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    updateStatus(id: string, updateStatusDto: UpdateStatusDto): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/tag.schema").Tag, {}> & import("./schemas/tag.schema").Tag & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
    remove(id: string): Promise<import("../type").IApiResponse<import("mongoose").Document<unknown, {}, import("./schemas/tag.schema").Tag, {}> & import("./schemas/tag.schema").Tag & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
}
