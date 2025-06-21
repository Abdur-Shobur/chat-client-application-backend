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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("./config");
let AppService = class AppService {
    constructor(config) {
        this.config = config;
    }
    getHello() {
        const config = this.config;
        const returnConfig = {
            port: config.port,
            host: config.host,
            databaseUri: config.databaseUri,
            jwtSecret: config.jwtSecret,
            jwtExpiresIn: config.jwtExpiresIn,
            email: config.email,
            emailPassword: config.emailPassword,
            hashSalt: config.hashSalt,
            isDevelopment: config.isDevelopment
                ? "Don't forget. This is development mode"
                : 'This is production mode',
        };
        if (config.isDevelopment) {
            return JSON.stringify(returnConfig, null, 2);
        }
        return 'Hello World!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.CustomConfigService])
], AppService);
//# sourceMappingURL=app.service.js.map