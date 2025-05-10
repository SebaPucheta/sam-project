import { PaginatedResponse } from "../../../commons/models/paginated-response";
import GetAllCarsDto from "../../../application/dtos/get-all-cars.dto";
import Car from "../../../domain/Car";
import CarRepository from "../../ports/car-repository";

export default class GetAllCarUseCase {
  constructor(private readonly carRepository: CarRepository) {
  }

  excecute(params?: GetAllCarsDto): Promise<PaginatedResponse<Car>> {
    return this.carRepository.getAllCars(params);
  }
}
