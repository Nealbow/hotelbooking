import { ApiProperty } from '@nestjs/swagger';

export class GetRoomsResponseDto {
  constructor(data: Partial<GetRoomsResponseDto>) {
    Object.assign(this, data);
  }
  @ApiProperty()
  public id: number;
}
