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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MigrationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const role_interfaces_1 = require("../role/interfaces/role.interfaces");
const role_schema_1 = require("../role/schemas/role.schema");
let MigrationService = MigrationService_1 = class MigrationService {
    constructor(roleModel) {
        this.roleModel = roleModel;
        this.logger = new common_1.Logger(MigrationService_1.name);
    }
    async addMissingTypeField() {
        this.logger.log('Starting migration: addMissingTypeField');
        const result = await this.roleModel.updateMany({ type: { $exists: false } }, { $set: { type: role_interfaces_1.IRoleType.User } });
        this.logger.log(`Migration completed: matched ${result.matchedCount}, modified ${result.modifiedCount}`);
    }
};
exports.MigrationService = MigrationService;
exports.MigrationService = MigrationService = MigrationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MigrationService);
//# sourceMappingURL=migration.service.js.map