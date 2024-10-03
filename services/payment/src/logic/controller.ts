// controller.ts
import { errorHandler, functionWrapper, Auth } from 'common-lib-tomeroko3';
import {
  AddPaymentMethodRequestType,
  AddPaymentMethodResponseType,
  UpdatePaymentMethodRequestType,
  UpdatePaymentMethodResponseType,
  RemovePaymentMethodRequestType,
  RemovePaymentMethodResponseType,
  AddPayoutMethodRequestType,
  AddPayoutMethodResponseType,
  UpdatePayoutMethodRequestType,
  UpdatePayoutMethodResponseType,
  RemovePayoutMethodRequestType,
  RemovePayoutMethodResponseType,
} from 'tomeroko3-events';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const addPaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as AddPaymentMethodRequestType['body'];
      const userID = req.user?.id as string;
      const result: AddPaymentMethodResponseType = await service.addPaymentMethod(userID, body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler(error, next);
    }
  });
};

export const updatePaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as UpdatePaymentMethodRequestType['body'];
      const userID = req.user?.id as string;
      const result: UpdatePaymentMethodResponseType = await service.updatePaymentMethod(userID, body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler(error, next);
    }
  });
};

export const removePaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as RemovePaymentMethodRequestType['body'];
      const userID = req.user?.id as string;
      const result: RemovePaymentMethodResponseType = await service.removePaymentMethod(userID, body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler(error, next);
    }
  });
};

export const addPayoutMethod = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as AddPayoutMethodRequestType['body'];
      const userID = req.user?.id as string;
      const result: AddPayoutMethodResponseType = await service.addPayoutMethod(userID, body);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler(error, next);
    }
  });
};

export const updatePayoutMethod = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as UpdatePayoutMethodRequestType['body'];
      const userID = req.user?.id as string;
      const result: UpdatePayoutMethodResponseType
