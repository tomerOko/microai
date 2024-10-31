import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { getTransactionId, setError } from '../../asyncStorage/utils';
import { ClientError } from '../appError';

export const routeNotFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const errorResponse = new ClientError(
    'ROUTE_NOT_FOUND',
    { description: `Path ${req.originalUrl} does not exist for ${req.method} method` },
    httpStatus.NOT_FOUND,
  );
  return next(errorResponse);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlingMiddleware = async (error: any, req: Request, res: Response, next: NextFunction) => {
  setError(error); //for the use of the httpLogger middleware
  const { httpStatus, clientErrorCode, clientErrorData } = error;
  const transactionId = getTransactionId();
  const errorProps = { code: clientErrorCode, data: clientErrorData, transactionId };
  res.status(httpStatus).send({ error: errorProps });
};
