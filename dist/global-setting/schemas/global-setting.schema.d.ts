import { HydratedDocument } from 'mongoose';
import { IGlobalSetting } from '../interfaces/global-setting.interfaces';
export type GlobalSettingDocument = HydratedDocument<GlobalSetting>;
export declare class GlobalSetting implements IGlobalSetting {
    default_user_role: string;
}
export declare const GlobalSettingSchema: import("mongoose").Schema<GlobalSetting, import("mongoose").Model<GlobalSetting, any, any, any, import("mongoose").Document<unknown, any, GlobalSetting, any> & GlobalSetting & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GlobalSetting, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<GlobalSetting>, {}> & import("mongoose").FlatRecord<GlobalSetting> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
