import Car from "../../domain/Car";
import CarRepository from "../ports/car-repository";

export default class GetAllCarUseCase {
  constructor(private readonly carRepository: CarRepository) {
  }

  excecute(): Promise<Array<Car>> {
    return this.carRepository.getAllCars();
  }
}