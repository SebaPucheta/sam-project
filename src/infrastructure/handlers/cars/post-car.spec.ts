import CarRepository from "../../../application/ports/car-repository";
import CreateCarUseCase from "../../../application/use-cases/create-car";
import Car from "../../../domain/Car";
import { PostCarHandler } from "./post-car";
import { createMock } from '@golevelup/ts-jest';

describe('PostCarHandler', function () {
  let repository: CarRepository;
  let handler: PostCarHandler;

  beforeAll(async () => {
    repository = createMock<CarRepository>();
    const useCase = new CreateCarUseCase(repository);
    handler = new PostCarHandler(useCase);
  });

  it('Should be successful validate with mandatory properties', async () => {
    const car = {
      version: '208 GT',
      licencePlate: 'ac133wd',
      brand: 'Peugeot',
      engine: '1.6'
    };

    jest.spyOn(repository, 'createCars').mockResolvedValue(undefined);
    const response = await handler.handle(car);

    expect(response).toStrictEqual({
      statusCode: 201,
    });
    expect(repository.createCars).toHaveBeenCalledTimes(1);
  });

  it('Should be failed, brand is mandatory', async () => {
    const car = {
      version: '208 GT',
      licencePlate: 'ac133wd',
      engine: '1.6'
    };

    jest.spyOn(repository, 'createCars').mockResolvedValue(undefined);
    const response = await handler.handle(car as Car);

    expect(response).toStrictEqual({
      statusCode: 400,
      body: JSON.stringify({message: 'Brand is a required field'}),
    });
    expect(repository.createCars).toHaveBeenCalledTimes(0);
  });
});

