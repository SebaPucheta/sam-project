import Joi from '@hapi/joi';
export declare const applyRequiredProperties: (schema: any) => Joi.ObjectSchema<any>;
export declare const validate: (payload: any, schema: any) => any;
