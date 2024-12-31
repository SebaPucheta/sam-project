import Car from '../../domain/Car';
import CarRepository from '../../application/ports/car-repository';
import { Schema, connect, model } from 'mongoose';

const carSchema = new Schema<Car>({
  brand: { type: String, required: true },
  version: { type: String, required: true },
  engine: { type: String, required: true },
  licencePlate: { type: String, required: true },
});
const CarModel = model<Car>('Car', carSchema);

export default class CarRepositoryDynamoDB implements CarRepository {
  async init(stringConnection: string) {
    try {
      await connect(stringConnection);
    } catch (error) {
      console.log(error);
    }
  }

  getAllCars(): Promise<Car[]> {
    return CarModel.find();
  }

  getCarById(id: string): Promise<Car | null> {
    return CarModel.findById(id).exec();
  }

  async createCars(data: Omit<Car, 'id'>): Promise<void> {
    const car = new CarModel(data); 
    await car.save();
  }
}
