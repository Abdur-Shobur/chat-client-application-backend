import { ConfigService } from '@nestjs/config';
export declare class CustomConfigService {
    private readonly configService;
    constructor(configService: ConfigService);
    get isDevelopment(): boolean;
    get port(): number;
    get host(): string;
    get databaseUri(): string;
    get jwtSecret(): string;
    get jwtExpiresIn(): string;
    get hashSalt(): string;
    get email(): string;
    get emailPassword(): string;
    get frontEndUrls(): string[];
}
