import { APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";
import CarRepositoryDynamoDB from "../../adapters/car-repository-mongoDB";
import SecretGetter from "../../../commons/secret-getter";
import { MiddyLambdaBuilder } from "../../../commons/infrastructure/middlewares/middy-lambda-builder";
import NotFoundError from "../../../commons/errors/not-found";
import DeleteCarUseCase from "../../../application/use-cases/cars/delete-car";

export class DeleteCarHandler {
  constructor(private readonly deleteCarUseCase: DeleteCarUseCase) {}

  async handle(id: string): Promise<APIGatewayProxyResultV2> {
    try {
      await this.deleteCarUseCase.execute(id);

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Car deleted successfully" }),
      };
    } catch (error) {
      let response = {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal Server Error" }),
      };

      if (error instanceof NotFoundError) {
        response = {
          statusCode: 404,
          body: JSON.stringify({ message: error.message }),
        };
      }

      return response;
    }
  }
}

const deleteCarHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResultV2> => {
  const secrets = new SecretGetter();
  const stringConnection = await secrets.getSecretValue("MONGODB_CONNECTION_STRING");
  const repository = new CarRepositoryDynamoDB();
  await repository.init(stringConnection);

  const handler = new DeleteCarHandler(new DeleteCarUseCase(repository));
  const id = event.pathParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Car ID is required" }),
    };
  }

  return await handler.handle(id);
};

export const handler = MiddyLambdaBuilder.getNewBuilder(deleteCarHandler)
  .withEndpointMiddlewares()
  .build();
