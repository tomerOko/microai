// router.ts
import { Auth, validateRequest } from 'common-lib-tomeroko3';
import { pathMap } from 'events-tomeroko3';
import express from 'express';

import * as controller from './controller';

export const router = express.Router();

const createBookingPath = pathMap['CREATE_BOOKING'];
router.post(
  createBookingPath.path,
  Auth('LOGGED_IN'),
  validateRequest(createBookingPath.requestValidation, createBookingPath.responseValidation),
  controller.createBooking,
);

const processBookingResponsePath = pathMap['PROCESS_BOOKING_RESPONSE'];
router.post(
  processBookingResponsePath.path,
  Auth('LOGGED_IN'),
  validateRequest(
    processBookingResponsePath.requestValidation,
    processBookingResponsePath.responseValidation,
  ),
  controller.processBookingResponse,
);

const rescheduleBookingPath = pathMap['RESCHEDULE_BOOKING'];
router.put(
  rescheduleBookingPath.path,
  Auth('LOGGED_IN'),
  validateRequest(rescheduleBookingPath.requestValidation, rescheduleBookingPath.responseValidation),
  controller.rescheduleBooking,
);

const cancelBookingPath = pathMap['CANCEL_BOOKING'];
router.delete(
  cancelBookingPath.path,
  Auth('LOGGED_IN'),
  validateRequest(cancelBookingPath.requestValidation, cancelBookingPath.responseValidation),
  controller.cancelBooking,
);
