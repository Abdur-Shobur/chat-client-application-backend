"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGlobalSettingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_global_setting_dto_1 = require("./create-global-setting.dto");
class UpdateGlobalSettingDto extends (0, swagger_1.PartialType)(create_global_setting_dto_1.CreateGlobalSettingDto) {
}
exports.UpdateGlobalSettingDto = UpdateGlobalSettingDto;
//# sourceMappingURL=update-global-setting.dto.js.map