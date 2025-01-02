import Car from '../../domain/Car';
import CarRepository from '../../application/ports/car-repository';
import { Schema, connect, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import GetAllCarsDto from '../../application/dtos/get-all-cars.dto';

const carSchema = new Schema<Car>({
  id: { type: String, required: true },
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

  getAllCars(params?: GetAllCarsDto): Promise<Car[]> {
    const query: any = {};

    if (params?.search) {
      const regex = new RegExp(params.search, 'i');
      query.$or = [
        { brand: regex },
        { version: regex },
        { engine: regex },
        { licencePlate: regex },
      ];
    }

    return CarModel.find(query).exec();
  }

  getCarById(id: string): Promise<Car | null> {
    return CarModel.findOne({id}).exec();
  }

  async createCars(data: Omit<Car, 'id'>): Promise<void> {
    const car = new CarModel({id: uuidv4(), ...data}); 
    await car.save();
  }

  async updateCar(id: string, data: Partial<Car>): Promise<void> {
    await CarModel.findOneAndUpdate({id}, data, { new: true }).exec();
  }

  async deleteCar(id: string): Promise<void> {
    await CarModel.findOneAndDelete({id}).exec();
  }
}
