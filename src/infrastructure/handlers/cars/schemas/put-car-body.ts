import Joi from '@hapi/joi';

export const carSchema = {
  brand: Joi.string()
    .regex(/^[a-zA-Z0-9 ]*$/)
    .messages({
      'string.base': 'Brand must be a type of text',
    }),
  version: Joi.string()
    .regex(/^[a-zA-Z0-9 ]*$/)
    .messages({
      'string.base': 'Version must be a type of text',
    }),
  engine: Joi.string()
    .regex(/^[a-zA-Z0-9-. ]*$/)
    .messages({
      'string.base': 'Engine must be a type of text',
    }),
  licencePlate: Joi.alternatives()
    .try(
      Joi.string().regex(/^[a-z]{3}[0-9]{3}$/),
      Joi.string().regex(/^[a-z]{2}[0-9]{3}[a-z]{2}$/ )
    )
    .messages({
      'alternatives.base': 'Licence plate hasnt the correct format',
      'alternatives.match': 'Licence plate hasnt the correct format',
    }),
};
