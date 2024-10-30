/**
 * @class ClientError
 * @extends Error
 * @classdesc Todo: add description
 * @param {string} clientErrorCode - a string coming from the clientErrorCodes dictionary. todo: add explanation
 * @param {object} clientErrorData - any data the controller might want to pass to the client
 * @param {number} httpStatus - error status code
 */
export class ClientError extends Error {
  constructor(public clientErrorCode: string, public clientErrorData: Record<string, any> = {}, public httpStatus: number) {
    super(clientErrorCode);
  }
}

/**
 * @class AppError
 * @extends ClientError
 * @classdesc Todo: add description
 * @param {string} errorCode - a string coming from the errorCodes dictionary. not just any string because in order to find the error with the debugger as fast as possible, the error code should be unique so that in quick search we can find the where the error is thrown
 * @param {object} errorData - any data the controller might want to pass to the client
 * @param {boolean} isOperational - Is error operational (expected) or programmatic error (a bug). 'classic' errors that do not have this property will not pass a flag like 'if (!error.isOperational) throw("a bug found")'
 * @param {string} clientErrorCode - a string coming from the clientErrorCodes dictionary. todo: add explanation
 * @param {object} clientErrorData - any data the controller might want to pass to the client
 * @param {string} httpStatus - error status code
 */
export class AppError extends ClientError {
  public readonly isAppError = true;

  constructor(
    public errorCode: string,
    public errorData: Record<string, any> = {},
    public isOperational: boolean,
    clientErrorCode: string,
    clientErrorData: Record<string, any>,
    httpStatus: number,
  ) {
    super(clientErrorCode, clientErrorData, httpStatus);
  }
}
