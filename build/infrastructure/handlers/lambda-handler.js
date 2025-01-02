"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = __importDefault(require("@middy/core"));
const http_router_1 = __importDefault(require("@middy/http-router"));
const routes_1 = require("./routes");
exports.handler = (0, core_1.default)().handler((0, http_router_1.default)(routes_1.routes));
//# sourceMappingURL=lambda-handler.js.map