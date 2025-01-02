"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetAllCarUseCase {
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    excecute(params) {
        return this.carRepository.getAllCars(params);
    }
}
exports.default = GetAllCarUseCase;
//# sourceMappingURL=get-all-cars.js.map