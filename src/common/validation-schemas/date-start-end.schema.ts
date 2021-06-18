import Joi = require('joi');

export const DateStartEndSchema: Joi.SchemaMap = {
  start: Joi.date().required(),
  end: Joi.date().greater(Joi.ref('start')).required(),
};
