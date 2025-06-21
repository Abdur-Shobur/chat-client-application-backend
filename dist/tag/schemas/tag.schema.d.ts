import { HydratedDocument } from 'mongoose';
import { ITag, ITagStatus } from '../interfaces/tag.interfaces';
export type TagDocument = HydratedDocument<Tag>;
export declare class Tag implements ITag {
    name: string;
    position: number;
    status?: ITagStatus;
}
export declare const TagSchema: import("mongoose").Schema<Tag, import("mongoose").Model<Tag, any, any, any, import("mongoose").Document<unknown, any, Tag, any> & Tag & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Tag, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Tag>, {}> & import("mongoose").FlatRecord<Tag> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
