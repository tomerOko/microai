// controller.ts
import { errorHandler, functionWrapper } from 'common-lib-tomeroko3';
import {
  signupEmailRequestType,
  signupEmailResponseType,
  completeClassicSignupRequestType,
  completeClassicSignupResponseType,
  signupOAuthRequestType,
  signupOAuthResponseType,
  addAuthMethodRequestType,
  addAuthMethodResponseType,
  updateProfileRequestType,
  updateProfileResponseType,
  deactivateProfileRequestType,
  deactivateProfileResponseType,
} from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const signupEmail = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as signupEmailRequestType['body'];
      const result: signupEmailResponseType = await service.signupEmail(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const completeClassicSignup = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as completeClassicSignupRequestType['body'];
      const result: completeClassicSignupResponseType = await service.completeClassicSignup(body);
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

export const addAuthMethod = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as addAuthMethodRequestType['body'];
      const result: addAuthMethodResponseType = await service.addAuthMethod(body);
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

export const deactivateProfile = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as deactivateProfileRequestType['body'];
      const result: deactivateProfileResponseType = await service.deactivateProfile(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};
