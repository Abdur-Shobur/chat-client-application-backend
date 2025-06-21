"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let CustomConfigService = class CustomConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get isDevelopment() {
        return process.env.NODE_ENV === 'development';
    }
    get port() {
        return this.configService.get('PORT');
    }
    get host() {
        return this.configService.get('HOST');
    }
    get databaseUri() {
        return this.configService.get('DATABASE_URL');
    }
    get jwtSecret() {
        return this.configService.get('JWT_SECRET');
    }
    get jwtExpiresIn() {
        return this.configService.get('JWT_EXPIRE');
    }
    get hashSalt() {
        return this.configService.get('HASH_SALT');
    }
    get email() {
        return this.configService.get('EMAIL_USER');
    }
    get emailPassword() {
        return this.configService.get('EMAIL_PASSWORD');
    }
    get frontEndUrls() {
        const urls = this.configService.get('FRONTEND_URL');
        return urls ? urls.split(',').map((url) => url.trim()) : [];
    }
};
exports.CustomConfigService = CustomConfigService;
exports.CustomConfigService = CustomConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CustomConfigService);
//# sourceMappingURL=config.service.js.map