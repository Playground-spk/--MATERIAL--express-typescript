import { commonErrorResJson } from "./interfaces/commonErrorResJson.interface";

class ErrorService {
  ValidationError(err: any, resIncludeError) {
    let message: string = '';
    for (let key in err[0].constraints) {
      message.length > 0 ? (message += ' ') : null;
      message += err[0].constraints[key];
    }
    const resJson: commonErrorResJson = {
      message,
      statusCode: 400,
      error: err,
    };
    if (!resIncludeError) {
      delete resJson.error;
    }

    return resJson;
  }
}

export default new ErrorService();
