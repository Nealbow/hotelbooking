import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HotelRoom } from './hotel-room.entity';

@Entity()
export class RoomOccupancy {
  constructor(data: Partial<RoomOccupancy>) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'timestamp',
  })
  public occupancy_start: Date;

  @Column({
    type: 'timestamp',
  })
  public occupancy_end: Date;

  @Column()
  public visitor_name: string;

  @Column()
  public visitor_phone: string;

  @ManyToOne(() => HotelRoom, (HotelRoom) => HotelRoom.occupancies)
  public room: HotelRoom;

  @CreateDateColumn({
    select: false,
  })
  public created_at: Date;

  @UpdateDateColumn({
    select: false,
  })
  public updated_at: Date;
}
