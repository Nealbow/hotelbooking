import Joi = require('joi');
export const positiveIntSchema: Joi.Schema = Joi.number().positive().integer();
