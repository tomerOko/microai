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

export type CreateBookingRequestType = z.infer<typeof createBookingRequestValidation>;
export type CreateBookingResponseType = z.infer<typeof createBookingResponseValidation>;

export type ProcessBookingResponseRequestType = z.infer<typeof processBookingResponseRequestValidation>;
export type ProcessBookingResponseResponseType = z.infer<typeof processBookingResponseResponseValidation>;

export type RescheduleBookingRequestType = z.infer<typeof rescheduleBookingRequestValidation>;
export type RescheduleBookingResponseType = z.infer<typeof rescheduleBookingResponseValidation>;

export type CancelBookingRequestType = z.infer<typeof cancelBookingRequestValidation>;
export type CancelBookingResponseType = z.infer<typeof cancelBookingResponseValidation>;
