// router.ts
import { Auth, validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

const setDefaultSchedule = pathMap['SET_DEFAULT_SCHEDULE'];
router.post(
  setDefaultSchedule.path,
  Auth('LOGGED_IN'),
  validateRequest(setDefaultSchedule.requestValidation, setDefaultSchedule.responseValidation),
  controller.setDefaultSchedule,
);

const updateWeeklySchedule = pathMap['UPDATE_WEEKLY_SCHEDULE'];
router.put(
  updateWeeklySchedule.path,
  Auth('LOGGED_IN'),
  validateRequest(updateWeeklySchedule.requestValidation, updateWeeklySchedule.responseValidation),
  controller.updateWeeklySchedule,
);

const toggleAvailableNow = pathMap['TOGGLE_AVAILABLE_NOW'];
router.post(
  toggleAvailableNow.path,
  Auth('LOGGED_IN'),
  validateRequest(toggleAvailableNow.requestValidation, toggleAvailableNow.responseValidation),
  controller.toggleAvailableNow,
);

const checkAvailability = pathMap['CHECK_AVAILABILITY'];
router.get(
  checkAvailability.path,
  validateRequest(checkAvailability.requestValidation, checkAvailability.responseValidation),
  controller.checkAvailability,
);
