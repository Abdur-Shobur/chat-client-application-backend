"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleType = exports.StatusType = void 0;
var StatusType;
(function (StatusType) {
    StatusType["ACTIVE"] = "active";
    StatusType["INACTIVE"] = "inactive";
    StatusType["DELETED"] = "deleted";
})(StatusType || (exports.StatusType = StatusType = {}));
var RoleType;
(function (RoleType) {
    RoleType["ADMIN"] = "admin";
    RoleType["PARENT"] = "parent";
    RoleType["STUDENT"] = "student";
})(RoleType || (exports.RoleType = RoleType = {}));
//# sourceMappingURL=status.interface.js.map