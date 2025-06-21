import { GlobalSettingService } from './global-setting.service';
import { CreateGlobalSettingDto } from './dto/create-global-setting.dto';
export declare class GlobalSettingController {
    private readonly GlobalSettingService;
    constructor(GlobalSettingService: GlobalSettingService);
    create(createGlobalSettingDto: CreateGlobalSettingDto): Promise<import("../type").IApiResponse<import("./schemas/global-setting.schema").GlobalSetting>>;
    findAll(): Promise<import("../type").IApiResponse<import("mongoose").FlattenMaps<{
        default_user_role: string;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
}
