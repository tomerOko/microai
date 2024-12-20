// controller.ts
import { errorHandler, functionWrapper } from 'common-lib-tomeroko3';
import {
  SignupEmailPart2RequestType,
  SignupEmailPart2ResponseType,
  SignupEmailRequestType,
  SignupEmailResponseType,
  UpdateProfileRequestType,
  UpdateProfileResponseType,
} from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';

import * as service from './service';

export const signupEmail = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as SignupEmailRequestType['body'];
      const result: SignupEmailResponseType = await service.signupEmail(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
      console.log('error');
    }
  });
};

export const signupEmailPart2 = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as SignupEmailPart2RequestType['body'];
      const result: SignupEmailPart2ResponseType = await service.signupEmailPart2(body);
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as UpdateProfileRequestType['body'];
      const result: UpdateProfileResponseType = await service.updateProfile(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const deactivateProfile = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      await service.deactivateProfile();
      res.status(httpStatus.OK).send({ message: 'Profile deactivated successfully' });
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};
