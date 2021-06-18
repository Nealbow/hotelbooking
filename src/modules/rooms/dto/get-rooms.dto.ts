import { ApiProperty } from '@nestjs/swagger';

export class GetRoomsDto {
  @ApiProperty({
    description: 'Идентификатор отеля',
  })
  public hotel: number;

  @ApiProperty({
    description: 'Начало посещения',
  })
  public start: Date;

  @ApiProperty({
    description: 'Конец посещения',
  })
  public end: Date;
}
