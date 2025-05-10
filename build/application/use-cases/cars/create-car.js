"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCarUseCase {
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    async excecute(params) {
        await this.carRepository.createCars({
            brand: params.brand,
            version: params.version,
            engine: params.engine,
            licencePlate: params.licencePlate.toUpperCase(),
        });
    }
}
exports.default = CreateCarUseCase;
//# sourceMappingURL=create-car.js.map