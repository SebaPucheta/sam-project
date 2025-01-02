"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddyLambdaBuilder = void 0;
const core_1 = __importDefault(require("@middy/core"));
const http_header_normalizer_1 = __importDefault(require("@middy/http-header-normalizer"));
const http_urlencode_path_parser_1 = __importDefault(require("@middy/http-urlencode-path-parser"));
const http_json_body_parser_1 = __importDefault(require("@middy/http-json-body-parser"));
const http_error_middleware_1 = require("./http-error.middleware");
const after_middleware_1 = require("./after.middleware");
class MiddyLambdaBuilder {
    constructor(handler) {
        this.handler = handler;
        this.middlewares = [];
        this.commonAuthorizerMiddlewares = [(0, http_header_normalizer_1.default)()];
        this.commonEndpointMiddlewares = [
            (0, http_header_normalizer_1.default)(),
            (0, http_error_middleware_1.httpErrorMiddleware)(),
            (0, after_middleware_1.afterMiddleware)(),
        ];
    }
    static getNewBuilder(handler) {
        return new MiddyLambdaBuilder(handler);
    }
    use(middleware) {
        this.middlewares.push(middleware);
        return this;
    }
    withAuthorizerMiddlewares() {
        this.middlewares.push(...this.commonAuthorizerMiddlewares);
        return this;
    }
    withEndpointMiddlewares(options = {
        parsePath: false,
        parseBody: false,
    }) {
        if (options.parsePath) {
            this.middlewares.push((0, http_urlencode_path_parser_1.default)());
        }
        if (options.parseBody) {
            this.middlewares.push((0, http_json_body_parser_1.default)());
        }
        this.middlewares.push(...this.commonEndpointMiddlewares);
        return this;
    }
    build() {
        return (0, core_1.default)().use(this.middlewares).handler(this.handler);
    }
}
exports.MiddyLambdaBuilder = MiddyLambdaBuilder;
//# sourceMappingURL=middy-lambda-builder.js.map