"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.afterMiddleware = void 0;
const constants_1 = require("../../constants/constants");
const afterMiddleware = () => {
    const after = async (request) => {
        request.response = {
            ...request.response,
            headers: {
                ...request.response.headers,
                ...constants_1.CORS_HEADERS,
            },
        };
    };
    return {
        after,
    };
};
exports.afterMiddleware = afterMiddleware;
//# sourceMappingURL=after.middleware.js.map