"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetCarByIdUseCase {
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    excecute(id) {
        return this.carRepository.getCarById(id);
    }
}
exports.default = GetCarByIdUseCase;
//# sourceMappingURL=get-car-by-id.js.map