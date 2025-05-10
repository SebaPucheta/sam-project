"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.DeleteCarHandler = void 0;
const car_repository_mongoDB_1 = __importDefault(require("../../adapters/car-repository-mongoDB"));
const secret_getter_1 = __importDefault(require("../../../commons/secret-getter"));
const middy_lambda_builder_1 = require("../../../commons/infrastructure/middlewares/middy-lambda-builder");
const not_found_1 = __importDefault(require("../../../commons/errors/not-found"));
const delete_car_1 = __importDefault(require("../../../application/use-cases/cars/delete-car"));
class DeleteCarHandler {
    constructor(deleteCarUseCase) {
        this.deleteCarUseCase = deleteCarUseCase;
    }
    async handle(id) {
        try {
            await this.deleteCarUseCase.execute(id);
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Car deleted successfully" }),
            };
        }
        catch (error) {
            let response = {
                statusCode: 500,
                body: JSON.stringify({ message: "Internal Server Error" }),
            };
            if (error instanceof not_found_1.default) {
                response = {
                    statusCode: 404,
                    body: JSON.stringify({ message: error.message }),
                };
            }
            return response;
        }
    }
}
exports.DeleteCarHandler = DeleteCarHandler;
const deleteCarHandler = async (event) => {
    const secrets = new secret_getter_1.default();
    const stringConnection = await secrets.getSecretValue("MONGODB_CONNECTION_STRING");
    const repository = new car_repository_mongoDB_1.default();
    await repository.init(stringConnection);
    const handler = new DeleteCarHandler(new delete_car_1.default(repository));
    const id = event.pathParameters?.id;
    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Car ID is required" }),
        };
    }
    return await handler.handle(id);
};
exports.handler = middy_lambda_builder_1.MiddyLambdaBuilder.getNewBuilder(deleteCarHandler)
    .withEndpointMiddlewares()
    .build();
//# sourceMappingURL=delete-car.handler.js.map