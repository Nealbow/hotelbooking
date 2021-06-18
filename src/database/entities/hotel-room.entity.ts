import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Hotel } from './hotel.entity';
import { RoomOccupancy } from './room-occupancy.entity';

@Entity()
export class HotelRoom {
  constructor(data: Partial<HotelRoom>) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Hotel, (Hotel) => Hotel.rooms)
  public hotel: Hotel;

  @OneToMany(() => RoomOccupancy, (RoomOccupancy) => RoomOccupancy.room)
  public occupancies: RoomOccupancy[];

  @CreateDateColumn({
    select: false,
  })
  public created_at: Date;

  @UpdateDateColumn({
    select: false,
  })
  public updated_at: Date;
}
