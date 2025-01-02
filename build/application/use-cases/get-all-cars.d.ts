import Car from "../../domain/Car";
import CarRepository from "../ports/car-repository";
export default class GetAllCarUseCase {
    private readonly carRepository;
    constructor(carRepository: CarRepository);
    excecute(): Promise<Car[]>;
}
