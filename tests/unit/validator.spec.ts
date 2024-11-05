
import BadRequestError from "../../src/commons/errors/bad-request";
import { applyRequiredProperties, validate } from "../../src/commons/validation-utils"
import { carSchema, joiCarSchema } from "../../src/infrastructure/handlers/schemas/post-car-body"

describe('Car schema validator', function () {
  it('Should be successful validate with mandatory properties', () => {
    const car = {
      version: '208 GT',
      licencePlate: 'ac133wd',
      brand: 'Peugeot',
      engine: '1.6'
    };

    const result = validate(car, applyRequiredProperties(carSchema));
    expect(result).toBe(car);
  });

  it('Should be successful validate with mandatory properties, with old licence plate', () => {
    const car = {
      version: '208 GT',
      licencePlate: 'acs133',
      brand: 'Peugeot',
      engine: '1.6'
    };

    const result = validate(car, applyRequiredProperties(carSchema));
    expect(result).toBe(car);
  });

  it('Should be successful validate with some properties', () => {
    const car = {
      version: '208 GT',
      licencePlate: 'ac133wd'
    };

    const result = validate(car, joiCarSchema);
    expect(result).toBe(car);
  });

  it('Should be failed validate with mandatory properties', () => {
    const car = {
      version: '208 GT',
      engine: '1.6'
    };

    function validateFunction() {
      validate(car, applyRequiredProperties(carSchema));
    }

    expect(validateFunction).toThrow(new Error('Brand is a required field'));
  });

  it('Should be failed because licence plate hasnt the correct format', () => {
    const car = {
      version: '208 GT',
      licencePlate: 'a',
      brand: 'Peugeot',
      engine: '1.6'
    };

    function validateFunction() {
      validate(car, applyRequiredProperties(carSchema));
    }

    expect(validateFunction).toThrow(new Error('Licence plate hasnt the correct format'));
  });
});

