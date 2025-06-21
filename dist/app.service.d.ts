import { CustomConfigService } from './config';
export declare class AppService {
    private readonly config;
    constructor(config: CustomConfigService);
    getHello(): string;
}
