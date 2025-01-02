import CreateCarDto from "../dtos/create-car-dto";
import CarRepository from "../ports/car-repository";
export default class CreateCarUseCase {
    private readonly carRepository;
    constructor(carRepository: CarRepository);
    excecute(params: CreateCarDto): Promise<void>;
}
