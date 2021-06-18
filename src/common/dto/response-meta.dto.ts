export class ResponseMetaDto {
  success: boolean;
  message: string;

  constructor(partial: Partial<ResponseMetaDto>) {
    Object.assign(this, partial);
  }
}
