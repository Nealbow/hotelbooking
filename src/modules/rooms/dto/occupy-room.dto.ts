import { ApiProperty } from '@nestjs/swagger';

export class OccupyRoomDto {
  id: number;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  start: Date;

  @ApiProperty()
  end: Date;
}
