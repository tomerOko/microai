// controller.ts
import { errorHandler, functionWrapper, Auth } from 'common-lib-tomeroko3';
import {
  startCallRequestType,
  startCallResponseType,
  endCallRequestType,
  endCallResponseType,
  getCallDetailsRequestType,
  getCallDetailsResponseType,
} from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const startCall = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as startCallRequestType['body'];
      const result: startCallResponseType = await service.startCall(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler(error, next);
    }
  });
};

export const endCall = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as endCallRequestType['body'];
      const result: endCallResponseType = await service.endCall(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler(error, next);
    }
  });
};

export const getCallDetails = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const params = req.params as getCallDetailsRequestType['params'];
      const result: getCallDetailsResponseType = await service.getCallDetails(params);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler(error, next);
    }
  });
};
