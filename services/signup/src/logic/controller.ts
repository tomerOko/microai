// controller.ts
import { errorHandler, functionWrapper } from 'common-lib-tomeroko3';
import {
  sendPincodeRequestType,
  sendPincodeResponseType,
  signupRequestType,
  signupResponseType,
  signupOAuthRequestType,
  signupOAuthResponseType,
  addAuthMethodRequestType,
  addAuthMethodResponseType,
  updateProfileRequestType,
  updateProfileResponseType,
  updatePasswordRequestType,
  updatePasswordResponseType,
} from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const test = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      res.send('Test route');
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const sendPincode = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as sendPincodeRequestType['body'];
      const result: sendPincodeResponseType = await service.sendPincode(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as signupRequestType['body'];
      const result: signupResponseType = await service.signup(body);
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const signupOAuth = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as signupOAuthRequestType['body'];
      const result: signupOAuthResponseType = await service.signupOAuth(body);
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const addAuthenticationMethod = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as addAuthMethodRequestType['body'];
      const result: addAuthMethodResponseType = await service.addAuthenticationMethod(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as updateProfileRequestType['body'];
      const result: updateProfileResponseType = await service.updateProfile(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as updatePasswordRequestType['body'];
      const result: updatePasswordResponseType = await service.updatePassword(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};
