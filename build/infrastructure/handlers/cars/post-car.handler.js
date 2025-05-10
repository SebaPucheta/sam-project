"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.PostCarHandler = void 0;
const middy_lambda_builder_1 = require("../../../commons/infrastructure/middlewares/middy-lambda-builder");
const create_car_1 = __importDefault(require("../../../application/use-cases/cars/create-car"));
const bad_request_1 = __importDefault(require("../../../commons/errors/bad-request"));
const secret_getter_1 = __importDefault(require("../../../commons/secret-getter"));
const validation_utils_1 = require("../../../commons/validation-utils");
const car_repository_mongoDB_1 = __importDefault(require("../../adapters/car-repository-mongoDB"));
const post_car_body_1 = require("./schemas/post-car-body");
const utils_1 = require("../../../commons/utils");
class PostCarHandler {
    constructor(createCarUseCase) {
        this.createCarUseCase = createCarUseCase;
    }
    async handle(params) {
        try {
            const car = (0, utils_1.cleanObject)(params, ['brand', 'version', 'engine', 'licencePlate']);
            (0, validation_utils_1.validate)(car, (0, validation_utils_1.applyRequiredProperties)(post_car_body_1.carSchema));
            await this.createCarUseCase.excecute(car);
            return {
                statusCode: 201,
                body: '{}'
            };
        }
        catch (error) {
            let response = {
                statusCode: 500,
                body: JSON.stringify({ message: 'Internal Server Error' }),
            };
            if (error instanceof bad_request_1.default) {
                response = {
                    statusCode: 400,
                    body: JSON.stringify({ message: error.message }),
                };
            }
            return response;
        }
    }
}
exports.PostCarHandler = PostCarHandler;
const postCarHandler = async (event) => {
    const secrets = new secret_getter_1.default();
    const stringConnection = await secrets.getSecretValue('MONGODB_CONNECTION_STRING');
    const repository = new car_repository_mongoDB_1.default();
    await repository.init(stringConnection);
    const useCase = new create_car_1.default(repository);
    const handler = new PostCarHandler(useCase);
    const body = event.body;
    return await handler.handle(body);
};
exports.handler = middy_lambda_builder_1.MiddyLambdaBuilder.getNewBuilder(postCarHandler)
    .withEndpointMiddlewares({ parseBody: true })
    .build();
//# sourceMappingURL=post-car.handler.js.map