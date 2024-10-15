// router.ts
import { validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

const getOnlineUsers = pathMap['GET_ONLINE_USERS'];
router.get(
  getOnlineUsers.path,
  validateRequest(getOnlineUsers.requestValidation, getOnlineUsers.responseValidation),
  controller.getOnlineUsers,
);
