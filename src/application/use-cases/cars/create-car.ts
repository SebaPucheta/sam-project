import CreateCarDto from "../../dtos/create-car.dto";
import CarRepository from "../../ports/car-repository";

export default class CreateCarUseCase {
  constructor(private readonly carRepository: CarRepository) {
  }

  async excecute(params: CreateCarDto): Promise<void> {
    await this.carRepository.createCars({
      brand: params.brand,
      version: params.version,
      engine: params.engine,
      licencePlate: params.licencePlate.toUpperCase(),
    });
  }
}
