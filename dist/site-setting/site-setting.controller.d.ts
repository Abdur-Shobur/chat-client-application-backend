import { SiteSettingService } from './site-setting.service';
import { CreateSiteSettingDto } from './dto/create-site-setting.dto';
export declare class SiteSettingController {
    private readonly siteSettingService;
    constructor(siteSettingService: SiteSettingService);
    create(files: {
        [key: string]: Express.Multer.File[];
    }, createSiteSettingDto: CreateSiteSettingDto): Promise<import("../type").IApiResponse<import("./schemas/site-setting.schema").SiteSetting>>;
    findAll(): Promise<import("../type").IApiResponse<import("mongoose").FlattenMaps<{
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
    }> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>>;
}
