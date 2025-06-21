import { ITag, ITagStatus } from '../interfaces/tag.interfaces';
export declare class CreateTagDto implements ITag {
    name: string;
    status?: ITagStatus;
}
