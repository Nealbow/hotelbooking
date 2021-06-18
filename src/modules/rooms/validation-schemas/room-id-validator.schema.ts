import { positiveIntSchema } from '../../../common/validation-schemas/number.validators';

export const RoomIdValidator = positiveIntSchema.required();
