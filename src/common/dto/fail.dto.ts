import { BaseResponseDto } from './base-response.dto';
import { ResponseMetaDto } from './response-meta.dto';

export class FailDto<T extends Error> extends BaseResponseDto<T> {
  constructor(data: T) {
    super({
      meta: new ResponseMetaDto({
        success: false,
        message: data.message,
      }),
    });
  }
}
