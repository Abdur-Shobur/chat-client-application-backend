"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRoleType = exports.IRoleStatus = void 0;
var IRoleStatus;
(function (IRoleStatus) {
    IRoleStatus["Active"] = "active";
    IRoleStatus["Inactive"] = "inactive";
    IRoleStatus["Deleted"] = "deleted";
})(IRoleStatus || (exports.IRoleStatus = IRoleStatus = {}));
var IRoleType;
(function (IRoleType) {
    IRoleType["Admin"] = "admin";
    IRoleType["User"] = "user";
})(IRoleType || (exports.IRoleType = IRoleType = {}));
//# sourceMappingURL=role.interfaces.js.map