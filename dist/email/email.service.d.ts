import { CustomConfigService } from 'src/config/config.service';
export declare class EmailService {
    private readonly config;
    constructor(config: CustomConfigService);
    private transporter;
    sendOtp(email: string, otp: string): Promise<void>;
}
