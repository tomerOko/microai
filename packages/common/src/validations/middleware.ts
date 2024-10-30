import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { AnyZodObject, ZodError } from 'zod';

import { AppError, ClientError } from '../errors/appError';
import { formatZodError } from '../errors/utils';
import { functionWrapper } from '../logging';

export const validateRequest = (reqSchema: AnyZodObject, resSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    return functionWrapper(async () => {
      try {
        const error = await validateAndUpdateRequestWithProvidedSchema(reqSchema, req);
        if (error) {
          next(new ClientError('REQUEST_VALIDATION_ERROR', (error as AppError).errorData, httpStatus.NOT_ACCEPTABLE));
          return;
        }
        setResponseValidation(res, resSchema);
        return next();
      } catch (error) {}
    });
  };
};

const isZodError = (error: any): error is ZodError => {
  return error.issues !== undefined;
};

const validateAndUpdateRequestWithProvidedSchema = async (schema: AnyZodObject, req: Request) => {
  return functionWrapper(async () => {
    try {
      const { body, query, params } = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      req.body = body;
      req.query = query;
      req.params = params;
    } catch (error: any) {
      if (!isZodError(error)) {
        return { error: error.message, description: 'could not validate' };
      }
      const formattedErrorObject = formatZodError(error);
      return formattedErrorObject;
    }
  });
};

const setResponseValidation = (res: Response, resSchema: AnyZodObject) => {
  const send = res.send;
  (res as any).send = function (body: any) {
    const isSecodndCall = typeof body === 'string';
    if (!body.error && !isSecodndCall) {
      validateResponseWithProvidedSchema(resSchema, body);
    }
    send.call(this, body);
  };
};

const validateResponseWithProvidedSchema = async (schema: AnyZodObject, body: any) => {
  return functionWrapper(async () => {
    try {
      await schema.parseAsync(body);
    } catch (error: any) {
      const errorData = isZodError(error) ? formatZodError(error) : { error: error.message };
      throw new AppError(
        'RESPONSE_VALIDATION_ERROR',
        errorData,
        true,
        'INTERNAL_SERVER_ERROR',
        {},
        httpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  });
};
