import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HotelRoom } from './hotel-room.entity';

@Entity()
export class Hotel {
  constructor(data: Partial<Hotel>) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => HotelRoom, (HotelRoom) => HotelRoom.hotel)
  public rooms: HotelRoom[];

  @CreateDateColumn({
    select: false,
  })
  public created_at: Date;

  @UpdateDateColumn({
    select: false,
  })
  public updated_at: Date;
}
