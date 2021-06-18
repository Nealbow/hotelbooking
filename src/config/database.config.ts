import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { HotelRoom } from '../database/entities/hotel-room.entity';
import { Hotel } from '../database/entities/hotel.entity';
import { RoomOccupancy } from '../database/entities/room-occupancy.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  synchronize: false,
  password: 'postgres',
  username: 'postgres',
  database: 'hotelbooking',
  entities: [Hotel, HotelRoom, RoomOccupancy],
  host: 'localhost',
  autoLoadEntities: true,
  logging: ['error'],
};
