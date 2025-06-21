import { HydratedDocument } from 'mongoose';
import { ISiteSetting } from '../interfaces/site-setting.interfaces';
export type SiteSettingDocument = HydratedDocument<SiteSetting>;
export declare class SiteSetting implements ISiteSetting {
    name: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    metaAuthor: string;
    metaCopyright: string;
    logo: string;
    favicon: string;
    footerText: string;
}
export declare const SiteSettingSchema: import("mongoose").Schema<SiteSetting, import("mongoose").Model<SiteSetting, any, any, any, import("mongoose").Document<unknown, any, SiteSetting, any> & SiteSetting & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SiteSetting, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SiteSetting>, {}> & import("mongoose").FlatRecord<SiteSetting> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
