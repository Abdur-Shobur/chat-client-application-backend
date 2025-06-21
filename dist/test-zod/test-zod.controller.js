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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestZodController = void 0;
const common_1 = require("@nestjs/common");
const test_zod_service_1 = require("./test-zod.service");
const update_test_zod_dto_1 = require("./dto/update-test-zod.dto");
const zod_validation_pipe_1 = require("../helper/zod-validation-pipe");
const test_zod_1 = require("./zod/test-zod");
let TestZodController = class TestZodController {
    constructor(testZodService) {
        this.testZodService = testZodService;
    }
    create(createUserDto) {
        return {
            message: 'User created successfully!',
            data: createUserDto,
        };
    }
    findAll() {
        return this.testZodService.findAll();
    }
    findOne(id) {
        return this.testZodService.findOne(+id);
    }
    update(id, updateTestZodDto) {
        return this.testZodService.update(+id, updateTestZodDto);
    }
    remove(id) {
        return this.testZodService.remove(+id);
    }
};
exports.TestZodController = TestZodController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(test_zod_1.CreateUserSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TestZodController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestZodController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestZodController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_test_zod_dto_1.UpdateTestZodDto]),
    __metadata("design:returntype", void 0)
], TestZodController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestZodController.prototype, "remove", null);
exports.TestZodController = TestZodController = __decorate([
    (0, common_1.Controller)('test-zod'),
    __metadata("design:paramtypes", [test_zod_service_1.TestZodService])
], TestZodController);
//# sourceMappingURL=test-zod.controller.js.map