import { BaseResponseDto } from './base-response.dto';
import { ResponseMetaDto } from './response-meta.dto';

export class SuccessDto<T> extends BaseResponseDto<T> {
  constructor(data: T) {
    super({
      meta: new ResponseMetaDto({
        success: true,
      }),
      data,
    });
  }
}
