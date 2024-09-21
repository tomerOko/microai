// controller.ts
import { errorHandler, functionWrapper } from 'common-lib-tomeroko3';
import {
  loginRequestType,
  loginResponseType,
  oauthLoginRequestType,
  oauthLoginResponseType,
} from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as loginRequestType['body'];
      const result: loginResponseType = await service.login(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const oauthLogin = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as oauthLoginRequestType['body'];
      const result: oauthLoginResponseType = await service.oauthLogin(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};
