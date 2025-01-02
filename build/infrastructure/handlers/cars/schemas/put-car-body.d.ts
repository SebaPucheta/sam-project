import Joi from '@hapi/joi';
export declare const carSchema: {
    brand: Joi.StringSchema;
    version: Joi.StringSchema;
    engine: Joi.StringSchema;
    licencePlate: Joi.AlternativesSchema;
};
