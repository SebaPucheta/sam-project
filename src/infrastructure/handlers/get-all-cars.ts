import GetAllCarUseCase from "../../application/use-cases/get-all-cars";
import SecretGetter from "../../commons/secret-getter";
import CarRepositoryDynamoDB from "../adapters/car-repository-mongoDB";

class GetAllCarsHandler {
  constructor(private readonly getAllCarUseCase: GetAllCarUseCase) {}

  async handle() {
    const cars = await this.getAllCarUseCase.excecute();
    const response = {
      statusCode: 200,
      body: JSON.stringify(cars),
    }

    return response;
  }
}

export const getAllCarsHandler = async () => {
  const secrets = new SecretGetter();
  const stringConnection = await secrets.getSecretValue('MONGODB_CONNECTION_STRING');
  const repository = new CarRepositoryDynamoDB();
  await repository.init(stringConnection);
  const useCase = new GetAllCarUseCase(repository)
  const handler = new GetAllCarsHandler(useCase);
  return await handler.handle();
}
