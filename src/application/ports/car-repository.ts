import Car from "../../domain/Car";

export default interface CarRepository {
  getAllCars(): Promise<Car[]>;
  getCarById(id: string): Promise<Car | null>;
  createCars(car: Omit<Car, 'id'>): Promise<void>;
};
