"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const carSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    brand: { type: String, required: true },
    version: { type: String, required: true },
    engine: { type: String, required: true },
    licencePlate: { type: String, required: true },
});
const CarModel = (0, mongoose_1.model)('Car', carSchema);
class CarRepositoryDynamoDB {
    async init(stringConnection) {
        try {
            await (0, mongoose_1.connect)(stringConnection);
        }
        catch (error) {
            console.log(error);
        }
    }
    getAllCars(params) {
        const query = {};
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
    getCarById(id) {
        return CarModel.findOne({ id }).exec();
    }
    async createCars(data) {
        const car = new CarModel({ id: (0, uuid_1.v4)(), ...data });
        await car.save();
    }
    async updateCar(id, data) {
        await CarModel.findOneAndUpdate({ id }, data, { new: true }).exec();
    }
    async deleteCar(id) {
        await CarModel.findOneAndDelete({ id }).exec();
    }
}
exports.default = CarRepositoryDynamoDB;
//# sourceMappingURL=car-repository-mongoDB.js.map