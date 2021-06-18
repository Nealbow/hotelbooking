import { ApiProperty } from '@nestjs/swagger';

export class OccupyRoomResponseDto {
  constructor(data: Partial<OccupyRoomResponseDto>) {
    Object.assign(this, data);
  }

  @ApiProperty({
    description: 'Флаг, обозначающий (не)успешную бронь',
  })
  public occupied: boolean;
}
