import CarRepository from "../../ports/car-repository";
import NotFoundError from "../../../commons/errors/not-found";
import UpdateCarDto from "../../dtos/update-car.dto";

export default class UpdateCarUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(id: string, data: UpdateCarDto): Promise<void> {
    const car = await this.carRepository.getCarById(id);
    if (!car) {
      throw new NotFoundError("Car not found");
    }

    if (data?.licencePlate) {
      data.licencePlate = data.licencePlate.toUpperCase();
    }
    await this.carRepository.updateCar(id, data);
  }
}
