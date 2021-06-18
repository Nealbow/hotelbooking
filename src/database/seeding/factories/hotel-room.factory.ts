import { define } from 'typeorm-seeding';
import { HotelRoom } from '../../entities/hotel-room.entity';

define(
  HotelRoom,
  (faker, context: Partial<HotelRoom>) =>
    new HotelRoom({
      ...context,
    }),
);
