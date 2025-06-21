import { ISiteSetting } from '../interfaces/site-setting.interfaces';
export declare class CreateSiteSettingDto implements ISiteSetting {
    name?: string;
    description?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    metaAuthor?: string;
    metaCopyright?: string;
    logo?: string;
    favicon?: string;
    footerText?: string;
}
