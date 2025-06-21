import { Model } from 'mongoose';
import { GlobalSetting } from './schemas/global-setting.schema';
import { CreateGlobalSettingDto } from './dto/create-global-setting.dto';
export declare class GlobalSettingService {
    private GlobalSettingModel;
    constructor(GlobalSettingModel: Model<GlobalSetting>);
    create(createGlobalSettingDto: CreateGlobalSettingDto): Promise<GlobalSetting>;
    findAll(): Promise<import("mongoose").FlattenMaps<{
        default_user_role: string;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getDefaultRole(): Promise<import("mongoose").FlattenMaps<{
        default_user_role: string;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
