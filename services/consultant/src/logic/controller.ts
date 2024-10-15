// controller.ts
import { errorHandler, functionWrapper, Auth } from 'common-lib-tomeroko3';
import {
  becomeConsultantRequestType,
  becomeConsultantResponseType,
  updateConsultantProfileRequestType,
  updateConsultantProfileResponseType,
  addTopicRequestType,
  addTopicResponseType,
  updateTopicRequestType,
  updateTopicResponseType,
  removeTopicRequestType,
  removeTopicResponseType,
} from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const becomeConsultant = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as becomeConsultantRequestType['body'];
      const result: becomeConsultantResponseType = await service.becomeConsultant(body);
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const updateConsultantProfile = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as updateConsultantProfileRequestType['body'];
      const result: updateConsultantProfileResponseType = await service.updateConsultantProfile(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const addTopic = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as addTopicRequestType['body'];
      const result: addTopicResponseType = await service.addTopic(body);
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const updateTopic = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as updateTopicRequestType['body'];
      const result: updateTopicResponseType = await service.updateTopic(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const removeTopic = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as removeTopicRequestType['body'];
      const result: removeTopicResponseType = await service.removeTopic(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};
