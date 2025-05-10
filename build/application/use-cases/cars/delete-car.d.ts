import CarRepository from '../../ports/car-repository';
export default class DeleteCarUseCase {
    private readonly carRepository;
    constructor(carRepository: CarRepository);
    execute(id: string): Promise<void>;
}
