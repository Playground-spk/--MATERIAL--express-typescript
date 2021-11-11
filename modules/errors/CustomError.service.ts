import { AppError } from '../../utils/error/AppError';

class CustomErrorService {
  IdDoesNotExist(id, idOf: string, method: string, table: string) {
    return new AppError(`not found ${idOf} id ${id} in ${table} cannot ${method} ${table}   `, 404);
  }
}

export default new CustomErrorService();
