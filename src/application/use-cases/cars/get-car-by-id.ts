import Car from "../../../domain/Car";
import CarRepository from "../../ports/car-repository";

export default class GetCarByIdUseCase {
  constructor(private readonly carRepository: CarRepository) {
  }

  excecute(id: string): Promise<Car | null> {
    return this.carRepository.getCarById(id);
  }
}
