import { define } from 'typeorm-seeding';
import { Hotel } from '../../entities/hotel.entity';

define(
  Hotel,
  (faker, context: Partial<Hotel>) =>
    new Hotel({
      name: faker.random.word(),
      ...context,
    }),
);
