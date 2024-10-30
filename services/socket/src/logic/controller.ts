// controller.ts
import { errorHandler, functionWrapper } from 'common-lib-tomeroko3';
import { GetOnlineUsersResponseType } from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const getOnlineUsers = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const result: GetOnlineUsersResponseType = await service.getOnlineUsers();
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler(error, next);
    }
  });
};
