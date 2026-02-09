export type HttpErrors = {
  statusCode: number;
  timestamp: string;
  error: { message: string | string[] };
};
