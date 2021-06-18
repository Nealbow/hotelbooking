import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Hotel } from '../../entities/hotel.entity';
import { HotelRoom } from '../../entities/hotel-room.entity';
import { RoomOccupancy } from '../../entities/room-occupancy.entity';

export class RandomSeeder implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const hotel: Hotel = await factory(Hotel)().create();
    const rooms: HotelRoom[] = await factory(HotelRoom)().createMany(5, {
      hotel,
    });
    await Promise.all(
      rooms.map(
        async (room) =>
          await factory(RoomOccupancy)().create({
            room,
          }),
      ),
    );
  }
}
