import { ErrorSource } from '../enums/errorSource';
import { HttpStatusCode } from '../enums/httpStatusCode';

export abstract class BaseError extends Error {
  public statusCode: number;
  public appErr = true;
  public source: ErrorSource;
  public errors: Record<string, unknown>[];

  constructor(errorSource: ErrorSource, message: string, stack?: string) {
    super(message);

    Object.setPrototypeOf(this, BaseError.prototype);
    this.errors = [];
    this.source = errorSource;
    this.statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;

    if (stack) {
      this.stack = stack;
    }
  }
}
