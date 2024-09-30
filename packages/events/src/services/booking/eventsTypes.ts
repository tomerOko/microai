// bookings.ts (message queue events types)
import * as z from 'zod';
import {
  bookingRequestedEventValidation,
  bookingApprovedEventValidation,
  bookingRejectedEventValidation,
  bookingCreatedEventValidation,
  bookingCancelledEventValidation,
  bookingRescheduledEventValidation,
} from '../validations/bookings';

export type BookingRequestedEventType = z.infer<typeof bookingRequestedEventValidation>;
export type BookingApprovedEventType = z.infer<typeof bookingApprovedEventValidation>;
export type BookingRejectedEventType = z.infer<typeof bookingRejectedEventValidation>;
export type BookingCreatedEventType = z.infer<typeof bookingCreatedEventValidation>;
export type BookingCancelledEventType = z.infer<typeof bookingCancelledEventValidation>;
export type BookingRescheduledEventType = z.infer<typeof bookingRescheduledEventValidation>;
