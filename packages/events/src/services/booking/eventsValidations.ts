// bookings.ts (message queue events validations)
import { z } from 'zod';
import { bookingEventsNames } from '../names';
import { bookingValidationProps } from '../../shared/validations/bookings';

export const bookingRequestedEventValidation = z.object({
  type: z.literal(bookingEventsNames.BOOKING_REQUESTED),
  data: z.object(bookingValidationProps),
});

export const bookingApprovedEventValidation = z.object({
  type: z.literal(bookingEventsNames.BOOKING_APPROVED),
  data: z.object({
    bookingID: z.string(),
    consultantID: z.string(),
    studentID: z.string(),
  }),
});

export const bookingRejectedEventValidation = z.object({
  type: z.literal(bookingEventsNames.BOOKING_REJECTED),
  data: z.object({
    bookingID: z.string(),
    consultantID: z.string(),
    studentID: z.string(),
  }),
});

export const bookingCreatedEventValidation = z.object({
  type: z.literal(bookingEventsNames.BOOKING_CREATED),
  data: z.object(bookingValidationProps),
});

export const bookingCancelledEventValidation = z.object({
  type: z.literal(bookingEventsNames.BOOKING_CANCELLED),
  data: z.object(bookingValidationProps),
});

export const bookingRescheduledEventValidation = z.object({
  type: z.literal(bookingEventsNames.BOOKING_RESCHEDULED),
  data: z.object(bookingValidationProps),
});
