import express from 'express';
import errorService from './error.service';
import { commonErrorResJson } from './interfaces/commonErrorResJson.interface';
class ErrorGlobalHandler {
  _errorControler(err: any, resIncludeError: boolean): commonErrorResJson {

    if (err?.isAppCustom) return err.errorResJson;

    if (err?.[0]?.constraints) {
      return errorService.ValidationError(err, resIncludeError);
    }
    const unHandleError: commonErrorResJson = {
      statusCode: 500,
      message: 'something went very wrong !',
      error: err,
    };
    if (!resIncludeError) {
      delete unHandleError.error;
    }
    return unHandleError;
  }
  globalErrorHandlerConfig() {
    const errorHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      const resIncludeError: boolean = process.env.NODE_ENV === 'production' ? false : true;

      const errorJson: commonErrorResJson = this._errorControler(err, resIncludeError);
      res.status(errorJson.statusCode).json(errorJson);
    };
    return errorHandler;
  }
}

export default new ErrorGlobalHandler();
