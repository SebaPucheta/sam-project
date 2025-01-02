import Car from "../../domain/Car";
import CarRepository from "../ports/car-repository";
export default class GetCarByIdUseCase {
    private readonly carRepository;
    constructor(carRepository: CarRepository);
    excecute(id: string): Promise<Car | null>;
}
