"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const middy_lambda_builder_1 = require("../../../commons/infrastructure/middlewares/middy-lambda-builder");
const sign_up_1 = __importDefault(require("../../../application/use-cases/auth/sign-up"));
const secret_getter_1 = __importDefault(require("../../../commons/secret-getter"));
const user_repository_dynamoDB_1 = __importDefault(require("../../adapters/user-repository-dynamoDB"));
class SignUpHandler {
    constructor(signUpUseCase) {
        this.signUpUseCase = signUpUseCase;
    }
    async handle(params) {
        const access = await this.signUpUseCase.excecute(params);
        const response = {
            statusCode: 200,
            body: JSON.stringify(access),
        };
        return response;
    }
}
const signUpHandler = async (event) => {
    const secrets = new secret_getter_1.default();
    const usersTableName = await secrets.getSecretValue('USERS_TABLE_NAME');
    const repository = new user_repository_dynamoDB_1.default(usersTableName || '');
    const privateKey = await secrets.getSecretValue('AUTH_PRIVATE_KEY');
    const saltRounds = await secrets.getSecretValue('SALT_ROUNDS');
    const useCase = new sign_up_1.default(repository, privateKey || '', Number(saltRounds) || 1);
    const handler = new SignUpHandler(useCase);
    return await handler.handle(event.body);
};
exports.handler = middy_lambda_builder_1.MiddyLambdaBuilder.getNewBuilder(signUpHandler)
    .withEndpointMiddlewares({ parseBody: true })
    .build();
//# sourceMappingURL=sign-up.handler.js.map