import { NextFunction } from 'express';

import { functionWrapper } from '../logging';

import { ClientError } from './appError';
import { isOperatinalError } from './utils';

const generalError: ClientError = new ClientError('INTERNAL_SERVER_ERROR', {}, 500);

export const errorHandler = (error: unknown, next: NextFunction) => {
  return functionWrapper(() => {
    if (isOperatinalError(error)) {
      const clientError = new ClientError(error.clientErrorCode, error.clientErrorData, error.httpStatus);
      next(clientError);
      return;
    }
    return next(generalError);
  });
};
