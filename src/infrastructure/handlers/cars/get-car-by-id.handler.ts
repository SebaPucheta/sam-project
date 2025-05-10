import { MiddyLambdaBuilder } from "../../../commons/infrastructure/middlewares/middy-lambda-builder";
import GetCarByIdUseCase from "../../../application/use-cases/cars/get-car-by-id";
import SecretGetter from "../../../commons/secret-getter";
import CarRepositoryDynamoDB from "../../adapters/car-repository-mongoDB";
import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from "aws-lambda";

class GetCarByIdHandler {
  constructor(private readonly getAllCarUseCase: GetCarByIdUseCase) {}

  async handle(id: string): Promise<APIGatewayProxyResultV2> {
    const car = await this.getAllCarUseCase.excecute(id);
    const response = {
      statusCode: 200,
      body: JSON.stringify(car),
    };

    return response;
  }
}

const getCarByIdHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2> => {
  const secrets = new SecretGetter();
  const stringConnection = await secrets.getSecretValue('MONGODB_CONNECTION_STRING');
  const repository = new CarRepositoryDynamoDB();
  await repository.init(stringConnection);

  const useCase = new GetCarByIdUseCase(repository);
  const handler = new GetCarByIdHandler(useCase);
  if (event.pathParameters?.id) {
    return await handler.handle(event.pathParameters.id);
  }
  return {
    statusCode: 400,
    body: JSON.stringify({ message: "Id not found"}),
  };
};

export const handler = MiddyLambdaBuilder.getNewBuilder(
  getCarByIdHandler,
)
  .withEndpointMiddlewares()
  .build();

