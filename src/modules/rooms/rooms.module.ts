import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelRoom } from '../../database/entities/hotel-room.entity';
import { RoomOccupancy } from '../../database/entities/room-occupancy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HotelRoom, RoomOccupancy])],
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
