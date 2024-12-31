import { APIGatewayProxyResultV2 } from "aws-lambda";
import GetAllCarUseCase from "../../../application/use-cases/get-all-cars";
import { MiddyLambdaBuilder } from "../../../commons/infrastructure/middlewares/middy-lambda-builder";
import SecretGetter from "../../../commons/secret-getter";
import CarRepositoryDynamoDB from "../../adapters/car-repository-mongoDB";

class GetAllCarsHandler {
  constructor(private readonly getAllCarUseCase: GetAllCarUseCase) {}

  async handle(): Promise<APIGatewayProxyResultV2> {
    const cars = await this.getAllCarUseCase.excecute();
    const response = {
      statusCode: 200,
      body: JSON.stringify(cars),
    };

    return response;
  }
}

const getAllCarsHandler = async (): Promise<APIGatewayProxyResultV2> => {
  const secrets = new SecretGetter();
  const stringConnection = await secrets.getSecretValue('MONGODB_CONNECTION_STRING');
  const repository = new CarRepositoryDynamoDB();
  await repository.init(stringConnection);
  const useCase = new GetAllCarUseCase(repository);
  const handler = new GetAllCarsHandler(useCase);
  return await handler.handle();
};

export const handler = MiddyLambdaBuilder.getNewBuilder(
  getAllCarsHandler,
)
  .withEndpointMiddlewares()
  .build();
