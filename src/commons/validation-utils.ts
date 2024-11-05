import Joi from '@hapi/joi';
import BadRequestError from './errors/bad-request';

// Public Functions
export const applyRequiredProperties = (schema: any) => {
  const newSchema: any = {};

  Object.keys(schema).forEach((key) => {
    newSchema[key] = schema[key].required();
  });
  
  return Joi.object(newSchema);
};

export const validate = (payload: any, schema: any) => {
  try {
    Joi.assert(payload, schema);
    return payload;
  } catch (err: any) {
    throw new BadRequestError(err.details.length > 0 ? err.details[0].message : '');
  };
};
