import { define } from 'typeorm-seeding';
import { RoomOccupancy } from '../../entities/room-occupancy.entity';

define(
  RoomOccupancy,
  (faker, context: Partial<RoomOccupancy>) =>
    new RoomOccupancy({
      visitor_name: faker.name.firstName(),
      visitor_phone: faker.phone.phoneNumber(),
      occupancy_start: faker.date.recent(),
      occupancy_end: faker.date.recent(-5),
      ...context,
    }),
);
