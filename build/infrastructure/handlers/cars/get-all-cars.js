"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const get_all_cars_1 = __importDefault(require("../../../application/use-cases/get-all-cars"));
const middy_lambda_builder_1 = require("../../../commons/infrastructure/middlewares/middy-lambda-builder");
const secret_getter_1 = __importDefault(require("../../../commons/secret-getter"));
const car_repository_mongoDB_1 = __importDefault(require("../../adapters/car-repository-mongoDB"));
class GetAllCarsHandler {
    constructor(getAllCarUseCase) {
        this.getAllCarUseCase = getAllCarUseCase;
    }
    async handle() {
        const cars = await this.getAllCarUseCase.excecute();
        const response = {
            statusCode: 200,
            body: JSON.stringify(cars),
        };
        return response;
    }
}
const getAllCarsHandler = async () => {
    const secrets = new secret_getter_1.default();
    const stringConnection = await secrets.getSecretValue('MONGODB_CONNECTION_STRING');
    const repository = new car_repository_mongoDB_1.default();
    await repository.init(stringConnection);
    const useCase = new get_all_cars_1.default(repository);
    const handler = new GetAllCarsHandler(useCase);
    return await handler.handle();
};
exports.handler = middy_lambda_builder_1.MiddyLambdaBuilder.getNewBuilder(getAllCarsHandler)
    .withEndpointMiddlewares()
    .build();
//# sourceMappingURL=get-all-cars.js.map