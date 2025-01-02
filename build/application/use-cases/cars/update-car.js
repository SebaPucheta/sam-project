"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const not_found_1 = __importDefault(require("../../../commons/errors/not-found"));
class UpdateCarUseCase {
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    async execute(id, data) {
        const car = await this.carRepository.getCarById(id);
        if (!car) {
            throw new not_found_1.default("Car not found");
        }
        if (data?.licencePlate) {
            data.licencePlate = data.licencePlate.toUpperCase();
        }
        await this.carRepository.updateCar(id, data);
    }
}
exports.default = UpdateCarUseCase;
//# sourceMappingURL=update-car.js.map