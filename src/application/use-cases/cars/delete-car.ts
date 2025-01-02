import CarRepository from '../../ports/car-repository';
import NotFoundError from '../../../commons/errors/not-found';

export default class DeleteCarUseCase {
  constructor(private readonly carRepository: CarRepository) {}

  async execute(id: string): Promise<void> {
    const car = await this.carRepository.getCarById(id);
    if (!car) {
      throw new NotFoundError("Car not found");
    }

    await this.carRepository.deleteCar(id);
  }
}
