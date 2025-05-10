import { PaginatedResponse } from "../../../commons/models/paginated-response";
import GetAllCarsDto from "../../../application/dtos/get-all-cars.dto";
import Car from "../../../domain/Car";
import CarRepository from "../../ports/car-repository";
export default class GetAllCarUseCase {
    private readonly carRepository;
    constructor(carRepository: CarRepository);
    excecute(params?: GetAllCarsDto): Promise<PaginatedResponse<Car>>;
}
