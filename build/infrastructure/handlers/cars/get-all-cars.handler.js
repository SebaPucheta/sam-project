"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const get_all_cars_1 = __importDefault(require("../../../application/use-cases/cars/get-all-cars"));
const middy_lambda_builder_1 = require("../../../commons/infrastructure/middlewares/middy-lambda-builder");
const secret_getter_1 = __importDefault(require("../../../commons/secret-getter"));
const car_repository_mongoDB_1 = __importDefault(require("../../adapters/car-repository-mongoDB"));
class GetAllCarsHandler {
    constructor(getAllCarUseCase) {
        this.getAllCarUseCase = getAllCarUseCase;
    }
    async handle(params) {
        const data = await this.getAllCarUseCase.excecute({
            search: params?.search,
            limit: params?.limit,
            page: params?.page,
        });
        const response = {
            statusCode: 200,
            body: JSON.stringify(data),
        };
        return response;
    }
}
const getAllCarsHandler = async (event) => {
    const secrets = new secret_getter_1.default();
    const stringConnection = await secrets.getSecretValue('MONGODB_CONNECTION_STRING');
    const repository = new car_repository_mongoDB_1.default();
    await repository.init(stringConnection);
    const useCase = new get_all_cars_1.default(repository);
    const handler = new GetAllCarsHandler(useCase);
    return await handler.handle(event?.queryStringParameters || undefined);
};
exports.handler = middy_lambda_builder_1.MiddyLambdaBuilder.getNewBuilder(getAllCarsHandler)
    .withEndpointMiddlewares()
    .build();
//# sourceMappingURL=get-all-cars.handler.js.map