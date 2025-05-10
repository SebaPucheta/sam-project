import Car from '../../domain/Car';
import CarRepository from '../../application/ports/car-repository';
import GetAllCarsDto from '../../application/dtos/get-all-cars.dto';
import { PaginatedResponse } from '../../commons/models/paginated-response';
export default class CarRepositoryDynamoDB implements CarRepository {
    init(stringConnection: string): Promise<void>;
    getAllCars(params?: GetAllCarsDto): Promise<PaginatedResponse<Car>>;
    getCarById(id: string): Promise<Car | null>;
    createCars(data: Omit<Car, 'id'>): Promise<void>;
    updateCar(id: string, data: Partial<Car>): Promise<void>;
    deleteCar(id: string): Promise<void>;
}
