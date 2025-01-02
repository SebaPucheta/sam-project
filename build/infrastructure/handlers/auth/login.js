"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const middy_lambda_builder_1 = require("../../../commons/infrastructure/middlewares/middy-lambda-builder");
const wrong_credentials_1 = __importDefault(require("../../../application/errors/wrong-credentials"));
const login_1 = __importDefault(require("../../../application/use-cases/login"));
const secret_getter_1 = __importDefault(require("../../../commons/secret-getter"));
const user_repository_dynamoDB_1 = __importDefault(require("../../adapters/user-repository-dynamoDB"));
class LoginHandler {
    constructor(loginUseCase) {
        this.loginUseCase = loginUseCase;
    }
    async handle(params) {
        try {
            const access = await this.loginUseCase.excecute(params);
            const response = {
                statusCode: 200,
                body: JSON.stringify(access),
            };
            return response;
        }
        catch (error) {
            let response = {
                statusCode: 500,
                body: JSON.stringify({ message: 'Internal Server Error' }),
            };
            if (error instanceof wrong_credentials_1.default) {
                response = {
                    statusCode: 403,
                    body: JSON.stringify({ message: error.message }),
                };
            }
            return response;
        }
    }
}
const loginHandler = async (event) => {
    const secrets = new secret_getter_1.default();
    const usersTableName = await secrets.getSecretValue('USERS_TABLE_NAME');
    const privateKey = await secrets.getSecretValue('AUTH_PRIVATE_KEY');
    const repository = new user_repository_dynamoDB_1.default(usersTableName || '');
    const useCase = new login_1.default(repository, privateKey || '');
    const handler = new LoginHandler(useCase);
    return await handler.handle(event.body);
};
exports.handler = middy_lambda_builder_1.MiddyLambdaBuilder.getNewBuilder(loginHandler)
    .withEndpointMiddlewares({ parseBody: true })
    .build();
//# sourceMappingURL=login.js.map