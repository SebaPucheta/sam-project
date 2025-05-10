import { PaginatedResponse } from "../../commons/models/paginated-response";
import Car from "../../domain/Car";
import GetAllCarsDto from "../dtos/get-all-cars.dto";

export default interface CarRepository {
  getAllCars(params?: GetAllCarsDto): Promise<PaginatedResponse<Car>>;
  getCarById(id: string): Promise<Car | null>;
  createCars(car: Omit<Car, 'id'>): Promise<void>;
  updateCar(id: string, data: Partial<Car>): Promise<void>;
  deleteCar(id: string): Promise<void>;
};
