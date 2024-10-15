// controller.ts
import { errorHandler, functionWrapper } from 'common-lib-tomeroko3';
import {
  submitReviewRequestType,
  submitReviewResponseType,
  submitLongTermReviewRequestType,
  submitLongTermReviewResponseType,
  getConsultantReviewsRequestType,
  getConsultantReviewsResponseType,
  getTopicReviewsRequestType,
  getTopicReviewsResponseType,
} from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const submitReview = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as submitReviewRequestType['body'];
      const result: submitReviewResponseType = await service.submitReview(body);
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const submitLongTermReview = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as submitLongTermReviewRequestType['body'];
      const result: submitLongTermReviewResponseType = await service.submitLongTermReview(body);
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const getConsultantReviews = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const query = req.query as unknown as getConsultantReviewsRequestType['query'];
      const result: getConsultantReviewsResponseType = await service.getConsultantReviews(query);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const getTopicReviews = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const query = req.query as unknown as getTopicReviewsRequestType['query'];
      const result: getTopicReviewsResponseType = await service.getTopicReviews(query);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};
