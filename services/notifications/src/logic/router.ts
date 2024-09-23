// router.ts
import { Auth, validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

const getNotificationsPath = pathMap['GET_NOTIFICATIONS'];
router.get(
  getNotificationsPath.path,
  Auth('LOGGED_IN'),
  validateRequest(getNotificationsPath.requestValidation, getNotificationsPath.responseValidation),
  controller.getNotifications,
);

const markNotificationAsReadPath = pathMap['MARK_NOTIFICATION_AS_READ'];
router.post(
  markNotificationAsReadPath.path,
  Auth('LOGGED_IN'),
  validateRequest(
    markNotificationAsReadPath.requestValidation,
    markNotificationAsReadPath.responseValidation,
  ),
  controller.markNotificationAsRead,
);
