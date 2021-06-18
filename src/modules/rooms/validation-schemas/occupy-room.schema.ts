import Joi = require('joi');
import { DateStartEndSchema } from '../../../common/validation-schemas/date-start-end.schema';

export const OccupyRoomSchema = Joi.object({
  phone: Joi.string().max(15).required(),
  name: Joi.string().max(255).required(),
  ...DateStartEndSchema,
});
