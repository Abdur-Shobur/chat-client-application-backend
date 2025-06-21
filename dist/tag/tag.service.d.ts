import { Tag } from './schemas/tag.schema';
import { Model } from 'mongoose';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ITagStatus } from './interfaces/tag.interfaces';
export declare class TagService {
    private TagModel;
    constructor(TagModel: Model<Tag>);
    create(createTagDto: CreateTagDto): Promise<import("mongoose").Document<unknown, {}, Tag, {}> & Tag & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(status?: string): Promise<any>;
    findOne(id: string): Promise<import("mongoose").FlattenMaps<{
        name: string;
        position: number;
        status?: ITagStatus;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, updateTagDto: UpdateTagDto): Promise<import("mongoose").Document<unknown, {}, Tag, {}> & Tag & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateStatus(id: string, status: ITagStatus): Promise<import("mongoose").Document<unknown, {}, Tag, {}> & Tag & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Tag, {}> & Tag & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
