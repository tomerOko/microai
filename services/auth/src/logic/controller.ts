// controller.ts
import { errorHandler, functionWrapper } from 'common-lib-tomeroko3';
import { PasswordLoginRequestType, PasswordLoginResponseType } from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as PasswordLoginRequestType['body'];
      const result: PasswordLoginResponseType = await service.login(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler(error, next);
    }
  });
};
