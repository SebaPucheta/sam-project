"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanObject = void 0;
const cleanObject = (obj, allowedKeys) => Object.entries(obj)
    .filter(([key, value]) => allowedKeys.includes(key) && value != null && value !== '')
    .reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
}, {});
exports.cleanObject = cleanObject;
//# sourceMappingURL=utils.js.map