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
exports.MigrationController = void 0;
const common_1 = require("@nestjs/common");
const migration_service_1 = require("./migration.service");
let MigrationController = class MigrationController {
    constructor(migrationService) {
        this.migrationService = migrationService;
    }
    async runMigration() {
        await this.migrationService.addMissingTypeField();
        return { message: 'Migration executed successfully' };
    }
};
exports.MigrationController = MigrationController;
__decorate([
    (0, common_1.Post)('role'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MigrationController.prototype, "runMigration", null);
exports.MigrationController = MigrationController = __decorate([
    (0, common_1.Controller)('migration'),
    __metadata("design:paramtypes", [migration_service_1.MigrationService])
], MigrationController);
//# sourceMappingURL=migration.controller.js.map