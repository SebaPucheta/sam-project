"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const not_found_1 = __importDefault(require("../../../commons/errors/not-found"));
class DeleteCarUseCase {
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    async execute(id) {
        const car = await this.carRepository.getCarById(id);
        if (!car) {
            throw new not_found_1.default("Car not found");
        }
        await this.carRepository.deleteCar(id);
    }
}
exports.default = DeleteCarUseCase;
//# sourceMappingURL=delete-car.js.map