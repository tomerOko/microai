// controller.ts
import { errorHandler, functionWrapper, Auth } from 'common-lib-tomeroko3';
import {
  createBookingRequestType,
  createBookingResponseType,
  processBookingResponseRequestType,
  processBookingResponseResponseType,
  rescheduleBookingRequestType,
  rescheduleBookingResponseType,
  cancelBookingRequestType,
  cancelBookingResponseType,
} from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as createBookingRequestType['body'];
      const result: createBookingResponseType = await service.createBooking(body);
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const processBookingResponse = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as processBookingResponseRequestType['body'];
      const result: processBookingResponseResponseType = await service.processBookingResponse(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const rescheduleBooking = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as rescheduleBookingRequestType['body'];
      const result: rescheduleBookingResponseType = await service.rescheduleBooking(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as cancelBookingRequestType['body'];
      const result: cancelBookingResponseType = await service.cancelBooking(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};
