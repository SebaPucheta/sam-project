"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const routes_1 = require("./cars/routes");
const route_1 = require("./auth/route");
exports.routes = [
    ...routes_1.carRoutes,
    ...route_1.authRoutes
];
//# sourceMappingURL=routes.js.map