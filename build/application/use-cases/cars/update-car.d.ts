import CarRepository from "../../ports/car-repository";
import UpdateCarDto from "../../dtos/update-car.dto";
export default class UpdateCarUseCase {
    private readonly carRepository;
    constructor(carRepository: CarRepository);
    execute(id: string, data: UpdateCarDto): Promise<void>;
}
