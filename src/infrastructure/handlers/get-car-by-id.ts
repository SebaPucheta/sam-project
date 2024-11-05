import GetCarByIdUseCase from "../../application/use-cases/get-car-by-id";
import SecretGetter from "../../commons/secret-getter";
import CarRepositoryDynamoDB from "../adapters/car-repository-mongoDB";

class GetCarByIdHandler {
  constructor(private readonly getAllCarUseCase: GetCarByIdUseCase) {}

  async handle(id: string) {
    const car = await this.getAllCarUseCase.excecute(id);
    const response = {
      statusCode: 200,
      body: JSON.stringify(car),
    }

    return response;
  }
}

export const getCarByIdHandler = async (event: { pathParameters: { id: string; }; }) => {
  const secrets = new SecretGetter();
  const stringConnection = await secrets.getSecretValue('MONGODB_CONNECTION_STRING');
  const repository = new CarRepositoryDynamoDB();
  await repository.init(stringConnection);

  const useCase = new GetCarByIdUseCase(repository)
  const handler = new GetCarByIdHandler(useCase);
  return await handler.handle(event.pathParameters.id);
}
