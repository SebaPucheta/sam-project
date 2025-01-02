"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const middy_lambda_builder_1 = require("../../../commons/infrastructure/middlewares/middy-lambda-builder");
const get_car_by_id_1 = __importDefault(require("../../../application/use-cases/get-car-by-id"));
const secret_getter_1 = __importDefault(require("../../../commons/secret-getter"));
const car_repository_mongoDB_1 = __importDefault(require("../../adapters/car-repository-mongoDB"));
class GetCarByIdHandler {
    constructor(getAllCarUseCase) {
        this.getAllCarUseCase = getAllCarUseCase;
    }
    async handle(id) {
        const car = await this.getAllCarUseCase.excecute(id);
        const response = {
            statusCode: 200,
            body: JSON.stringify(car),
        };
        return response;
    }
}
const getCarByIdHandler = async (event) => {
    const secrets = new secret_getter_1.default();
    const stringConnection = await secrets.getSecretValue('MONGODB_CONNECTION_STRING');
    const repository = new car_repository_mongoDB_1.default();
    await repository.init(stringConnection);
    const useCase = new get_car_by_id_1.default(repository);
    const handler = new GetCarByIdHandler(useCase);
    if (event.pathParameters?.id) {
        return await handler.handle(event.pathParameters.id);
    }
    return {
        statusCode: 400,
        body: JSON.stringify({ message: "Id not found" }),
    };
};
exports.handler = middy_lambda_builder_1.MiddyLambdaBuilder.getNewBuilder(getCarByIdHandler)
    .withEndpointMiddlewares()
    .build();
//# sourceMappingURL=get-car-by-id.js.map