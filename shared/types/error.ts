export interface ServerError {
  statusCode: number;
  statusMessage: string;
  message: string;
  data?: any;
}
