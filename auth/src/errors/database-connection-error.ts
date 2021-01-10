import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {

  statusCode = 500;
  
  message = 'Could not connect to the database';

  constructor() {
    super('Database connection error');
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}