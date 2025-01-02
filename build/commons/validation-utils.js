"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.applyRequiredProperties = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const bad_request_1 = __importDefault(require("./errors/bad-request"));
const applyRequiredProperties = (schema) => {
    const newSchema = {};
    Object.keys(schema).forEach((key) => {
        newSchema[key] = schema[key].required();
    });
    return joi_1.default.object(newSchema);
};
exports.applyRequiredProperties = applyRequiredProperties;
const validate = (payload, schema) => {
    try {
        joi_1.default.assert(payload, schema);
        return payload;
    }
    catch (err) {
        console.error(err);
        throw new bad_request_1.default(err?.details?.length > 0 ? err.details[0].message : '');
    }
    ;
};
exports.validate = validate;
//# sourceMappingURL=validation-utils.js.map