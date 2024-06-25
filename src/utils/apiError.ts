import httpStatus from 'http-status';

export default class ApiError extends Error {
  public statusCode: number;
  public code: string;

  public constructor(statusCode: number, message?: string, code?: string) {
    super(message ?? httpStatus[statusCode as keyof typeof httpStatus].toString() ?? 'Unknown status code');
    this.statusCode = statusCode;
    this.code = code ?? httpStatus[`${statusCode}_NAME` as keyof typeof httpStatus].toString() ?? 'UNKNOWN_STATUS_CODE';
    Error.captureStackTrace(this, this.constructor);
  }
}

new Error();
