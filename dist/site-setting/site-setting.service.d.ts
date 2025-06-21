import { CreateSiteSettingDto } from './dto/create-site-setting.dto';
import { SiteSetting } from './schemas/site-setting.schema';
import { Model } from 'mongoose';
export declare class SiteSettingService {
    private siteSettingModel;
    constructor(siteSettingModel: Model<SiteSetting>);
    create(createSiteSettingDto: CreateSiteSettingDto): Promise<SiteSetting>;
    findAll(): Promise<import("mongoose").FlattenMaps<{
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
    }>;
}
