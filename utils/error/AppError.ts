import { commonErrorResJson } from './../../modules/errors/interfaces/commonErrorResJson.interface';
export class AppError extends Error {
  statusCode: any;
  status: string;
  errorResJson: commonErrorResJson;
  isAppCustom: boolean;
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isAppCustom = true;
    this.errorResJson = { statusCode, message };
    Error.captureStackTrace(this, this.constructor);
  }
}

