"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpErrorMiddleware = void 0;
const util_1 = require("@middy/util");
const constants_1 = require("../../constants/constants");
const defaults = {
    fallbackMessage: null,
};
const httpErrorMiddleware = (opts = {}) => {
    const options = { ...defaults, ...opts };
    const onError = async (request) => {
        if (request.response !== undefined) {
            return;
        }
        if (request.error.statusCode && request.error.expose === undefined) {
            request.error.expose = !!request.error.statusCode;
        }
        console.error(request.error);
        if (!request.error.statusCode || !request.error.expose) {
            request.response = {
                statusCode: 500,
                body: JSON.stringify({
                    message: options.fallbackMessage ?? 'concha de la lora',
                }),
            };
        }
        if (request.error.expose) {
            (0, util_1.normalizeHttpResponse)(request);
            const { statusCode, message, headers, cause } = request.error;
            const body = JSON.stringify({
                message,
                cause,
            });
            request.response = {
                ...request.response,
                statusCode,
                body,
                headers: {
                    ...headers,
                    ...request.response.headers,
                    ...constants_1.CORS_HEADERS,
                },
            };
        }
    };
    return {
        onError,
    };
};
exports.httpErrorMiddleware = httpErrorMiddleware;
//# sourceMappingURL=http-error.middleware.js.map