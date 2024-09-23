// router.ts
import { Auth, validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

const sendMessagePath = pathMap['SEND_MESSAGE'];
router.post(
  sendMessagePath.path,
  Auth('LOGGED_IN'),
  validateRequest(sendMessagePath.requestValidation, sendMessagePath.responseValidation),
  controller.sendMessage,
);

const getChatRoomMessagesPath = pathMap['GET_CHAT_ROOM_MESSAGES'];
router.get(
  getChatRoomMessagesPath.path,
  Auth('LOGGED_IN'),
  validateRequest(
    getChatRoomMessagesPath.requestValidation,
    getChatRoomMessagesPath.responseValidation
  ),
  controller.getChatRoomMessages,
);

const getChatRoomsPath = pathMap['GET_CHAT_ROOMS'];
router.get(
  getChatRoomsPath.path,
  Auth('LOGGED_IN'),
  validateRequest(getChatRoomsPath.requestValidation, getChatRoomsPath.responseValidation),
  controller.getChatRooms,
);
