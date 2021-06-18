import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { OccupyRoomDto } from './dto/occupy-room.dto';
import { OccupyRoomSchema } from './validation-schemas/occupy-room.schema';
import { GetRoomsSchema } from './validation-schemas/get-rooms.schema';
import { GetRoomsDto } from './dto/get-rooms.dto';
import { positiveIntSchema } from '../../common/validation-schemas/number.validators';
import { OccupyRoomResponseDto } from './dto/occupy-room-response.dto';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { SuccessDto } from '../../common/dto/success.dto';
import { GetRoomsResponseDto } from './dto/get-rooms-response.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('/:room/occupy')
  @ApiOkResponse({
    status: 200,
    type: OccupyRoomResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
  })
  occupyRoom(
    @Body(new JoiValidationPipe(OccupyRoomSchema)) query: OccupyRoomDto,
    @Param('room', new JoiValidationPipe(positiveIntSchema)) room: number,
  ): Promise<OccupyRoomResponseDto> {
    query.id = room;
    return this.roomsService.occupyRoom(query).then(
      (result) =>
        new OccupyRoomResponseDto({
          occupied: result,
        }),
    );
  }

  @Get()
  @UsePipes(new JoiValidationPipe(GetRoomsSchema))
  @ApiOkResponse({
    type: GetRoomsResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    status: 400,
  })
  getRooms(@Query() query: GetRoomsDto): Promise<GetRoomsResponseDto[]> {
    return this.roomsService.getRooms(query).then((result) =>
      result.map(
        (item) =>
          new GetRoomsResponseDto({
            id: item.id,
          }),
      ),
    );
  }
}
