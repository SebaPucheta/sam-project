"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetAllCarUseCase {
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    excecute() {
        return this.carRepository.getAllCars();
    }
}
exports.default = GetAllCarUseCase;
//# sourceMappingURL=get-all-cars.js.map