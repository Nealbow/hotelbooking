import Joi = require('joi');
import { positiveIntSchema } from '../../../common/validation-schemas/number.validators';
import { DateStartEndSchema } from '../../../common/validation-schemas/date-start-end.schema';

export const GetRoomsSchema = Joi.object({
  hotel: positiveIntSchema.required(),
  ...DateStartEndSchema,
});
