// controller.ts
import { errorHandler, functionWrapper, Auth } from 'common-lib-tomeroko3';
import {
  searchRequestType,
  searchResponseType,
  getRecommendationsRequestType,
  getRecommendationsResponseType,
} from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const search = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as searchRequestType['body'];
      const result: searchResponseType = await service.search(body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler(error, next);
    }
  });
};

export const getRecommendations = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const userID = getAuthenticatedID() as string;
      const query = req.query as unknown as getRecommendationsRequestType['query'];
      const result: getRecommendationsResponseType = await service.getRecommendations(userID, query);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler(error, next);
    }
  });
};
