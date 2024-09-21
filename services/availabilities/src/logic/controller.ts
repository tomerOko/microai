// controller.ts
import { errorHandler, functionWrapper, Auth } from 'common-lib-tomeroko3';
import {
  setDefaultScheduleRequestType,
  setDefaultScheduleResponseType,
  updateWeeklyScheduleRequestType,
  updateWeeklyScheduleResponseType,
  toggleAvailableNowRequestType,
  toggleAvailableNowResponseType,
  checkAvailabilityRequestType,
  checkAvailabilityResponseType,
} from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const setDefaultSchedule = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as setDefaultScheduleRequestType['body'];
      const result: setDefaultScheduleResponseType = await service.setDefaultSchedule(body);
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const updateWeeklySchedule = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as updateWeeklyScheduleRequestType['body'];
      const result: updateWeeklyScheduleResponseType = await service.updateWeeklySchedule(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const toggleAvailableNow = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as toggleAvailableNowRequestType['body'];
      const result: toggleAvailableNowResponseType = await service.toggleAvailableNow(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const checkAvailability = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const query = req.query as unknown as checkAvailabilityRequestType['query'];
      const result: checkAvailabilityResponseType = await service.checkAvailability(query);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};
