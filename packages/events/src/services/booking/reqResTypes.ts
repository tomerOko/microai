// bookings.ts (request and response types)
import * as z from 'zod';
import {
  createBookingRequestValidation,
  createBookingResponseValidation,
  processBookingResponseRequestValidation,
  processBookingResponseResponseValidation,
  rescheduleBookingRequestValidation,
  rescheduleBookingResponseValidation,
  cancelBookingRequestValidation,
  cancelBookingResponseValidation,
} from './reqResValidations';

export type createBookingRequestType = z.infer<typeof createBookingRequestValidation>;
export type createBookingResponseType = z.infer<typeof createBookingResponseValidation>;

export type processBookingResponseRequestType = z.infer<typeof processBookingResponseRequestValidation>;
export type processBookingResponseResponseType = z.infer<typeof processBookingResponseResponseValidation>;

export type rescheduleBookingRequestType = z.infer<typeof rescheduleBookingRequestValidation>;
export type rescheduleBookingResponseType = z.infer<typeof rescheduleBookingResponseValidation>;

export type cancelBookingRequestType = z.infer<typeof cancelBookingRequestValidation>;
export type cancelBookingResponseType = z.infer<typeof cancelBookingResponseValidation>;
