// controller.ts
import { errorHandler, functionWrapper, Auth } from 'common-lib-tomeroko3';
import {
  getNotificationsRequestType,
  getNotificationsResponseType,
  markNotificationAsReadRequestType,
  markNotificationAsReadResponseType,
} from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const userID = req.user?.id as string;
      const result: getNotificationsResponseType = await service.getNotifications(userID);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const markNotificationAsRead = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const userID = req.user?.id as string;
      const body = req.body as markNotificationAsReadRequestType['body'];
      const result: markNotificationAsReadResponseType = await service.markNotificationAsRead(
        userID,
        body.notificationID,
      );
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};
