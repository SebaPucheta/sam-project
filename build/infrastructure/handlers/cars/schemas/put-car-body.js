"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
exports.carSchema = {
    brand: joi_1.default.string()
        .regex(/^[a-zA-Z0-9 ]*$/)
        .messages({
        'string.base': 'Brand must be a type of text',
    }),
    version: joi_1.default.string()
        .regex(/^[a-zA-Z0-9 ]*$/)
        .messages({
        'string.base': 'Version must be a type of text',
    }),
    engine: joi_1.default.string()
        .regex(/^[a-zA-Z0-9-. ]*$/)
        .messages({
        'string.base': 'Engine must be a type of text',
    }),
    licencePlate: joi_1.default.alternatives()
        .try(joi_1.default.string().regex(/^[a-z]{3}[0-9]{3}$/), joi_1.default.string().regex(/^[a-z]{2}[0-9]{3}[a-z]{2}$/))
        .messages({
        'alternatives.base': 'Licence plate hasnt the correct format',
        'alternatives.match': 'Licence plate hasnt the correct format',
    }),
};
//# sourceMappingURL=put-car-body.js.map