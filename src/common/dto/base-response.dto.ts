import { ResponseMetaDto } from './response-meta.dto';

export class BaseResponseDto<T> {
  meta: ResponseMetaDto;
  data: T;

  constructor(data: Partial<BaseResponseDto<T>>) {
    Object.assign(this, data);
  }
}
