// controller.ts
import { errorHandler, functionWrapper, Auth } from 'common-lib-tomeroko3';
import {
  sendMessageRequestType,
  sendMessageResponseType,
  getChatRoomMessagesRequestType,
  getChatRoomMessagesResponseType,
  getChatRoomsRequestType,
  getChatRoomsResponseType,
} from 'events-tomeroko3';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import * as service from './service';

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const body = req.body as sendMessageRequestType['body'];
      const result: sendMessageResponseType = await service.sendMessage(body);
      res.status(httpStatus.CREATED).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const getChatRoomMessages = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const params = req.params as getChatRoomMessagesRequestType['params'];
      const result: getChatRoomMessagesResponseType = await service.getChatRoomMessages(params);
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};

export const getChatRooms = async (req: Request, res: Response, next: NextFunction) => {
  return functionWrapper(async () => {
    try {
      const result: getChatRoomsResponseType = await service.getChatRooms();
      res.status(httpStatus.OK).send(result);
    } catch (error) {
      errorHandler({})(error, next);
    }
  });
};
