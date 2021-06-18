import { Injectable } from '@nestjs/common';
import { OccupyRoomDto } from './dto/occupy-room.dto';
import { GetRoomsDto } from './dto/get-rooms.dto';
import { HotelRoom } from '../../database/entities/hotel-room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { GetRoomOccupancyDto } from './dto/get-room-occupancy.dto';
import { RoomOccupancy } from '../../database/entities/room-occupancy.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(HotelRoom) private roomsRepository: Repository<HotelRoom>,
    @InjectRepository(RoomOccupancy)
    private occupancyRepository: Repository<RoomOccupancy>,
  ) {}
  getRooms(data: GetRoomsDto): Promise<HotelRoom[]> {
    const query = this.roomsRepository
      .createQueryBuilder('room')
      .leftJoin(
        'room.occupancies',
        'occ',
        'occ.occupancy_end between :start and :end ' +
          'or occ.occupancy_start between :start and :end ' +
          'or :start between occ.occupancy_start and occ.occupancy_end ' +
          'or :end between occ.occupancy_start and occ.occupancy_end',
        {
          start: data.start,
          end: data.end,
        },
      )
      .where('room.hotel = :hotelId', { hotelId: data.hotel });
    if (data.start && data.end) {
      query.andWhere(
        new Brackets((qb) =>
          qb
            .andWhere('occ.occupancy_start not between :start and :end', {
              start: data.start,
              end: data.end,
            })
            .andWhere('occ.occupancy_end not between :start and :end', {
              start: data.start,
              end: data.end,
            })
            .andWhere(
              ':start not between occ.occupancy_start and occ.occupancy_end',
              {
                start: data.start,
              },
            )
            .andWhere(
              ':end not between occ.occupancy_start and occ.occupancy_end',
              {
                end: data.end,
              },
            )
            .orWhere('occ is null'),
        ),
      );
    }
    return query.getMany();
  }

  private async canOccupy(
    roomId: number,
    start: Date,
    end: Date,
  ): Promise<boolean> {
    const haveOccupations: boolean = await this.occupancyRepository
      .count({
        where: {
          room: roomId,
        },
      })
      .then((count) => count > 0);
    if (!haveOccupations) {
      return true;
    }
    return this.occupancyRepository
      .createQueryBuilder('occ')
      .andWhere('occ.occupancy_start not between :start and :end', {
        start,
        end,
      })
      .andWhere('occ.occupancy_end not between :start and :end', {
        start,
        end,
      })
      .andWhere(
        ':start not between occ.occupancy_start and occ.occupancy_end',
        {
          start,
        },
      )
      .andWhere(':end not between occ.occupancy_start and occ.occupancy_end', {
        end,
      })
      .andWhere('occ.room = :roomId', { roomId })
      .getCount()
      .then((count) => count > 0);
  }

  async occupyRoom(data: OccupyRoomDto): Promise<boolean> {
    const canOccupy: boolean = await this.canOccupy(
      data.id,
      data.start,
      data.end,
    );
    if (!canOccupy) {
      return false;
    }
    return this.occupancyRepository
      .save(
        new RoomOccupancy({
          room: new HotelRoom({
            id: data.id,
          }),
          visitor_phone: data.phone,
          visitor_name: data.name,
          occupancy_end: data.end,
          occupancy_start: data.start,
        }),
      )
      .then(() => true);
  }
}
