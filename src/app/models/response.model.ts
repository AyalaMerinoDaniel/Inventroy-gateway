export class ResponseApi {
  public succeed: boolean;
  public statusCode: number;
  public code: number;
  public result: any;
  public message: string;
  public friendlyMessage: string[];
  public error: string;
  public created: string;

  constructor(
      succeed: boolean,
      statusCode: number,
      code: number,
      result: any,
      message: string,
      friendlyMessage: string[],
      error: string,
      created: string
  ) {
      this.succeed = succeed;
      this.statusCode = statusCode;
      this.code = code;
      this.result = result;
      this.message = message;
      this.friendlyMessage = friendlyMessage;
      this.error = error;
      this.created = created;
  }

}