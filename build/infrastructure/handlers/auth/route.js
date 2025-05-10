"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const http_method_1 = require("../../../commons/models/http-method");
const login_handler_1 = require("./login.handler");
const sign_up_handler_1 = require("./sign-up.handler");
exports.authRoutes = [
    {
        path: '/login',
        method: http_method_1.HttpMethod.POST,
        withAuthorizer: false,
        handler: login_handler_1.handler,
    },
    {
        path: '/sign-up',
        method: http_method_1.HttpMethod.POST,
        withAuthorizer: false,
        handler: sign_up_handler_1.handler,
    },
];
//# sourceMappingURL=route.js.map