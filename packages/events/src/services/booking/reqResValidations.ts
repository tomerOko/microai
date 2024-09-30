// bookings.ts (request and response validations)
import { z } from 'zod';

export const createBookingRequestValidation = z.object({
  body: z.object({
    consultantID: z.string(),
    availabilityBlockID: z.string(),
    details: z.object({
      message: z.string().optional(),
      // Additional details can be added here
    }),
  }),
});

export const createBookingResponseValidation = z.object({
  bookingID: z.string(),
});

export const processBookingResponseRequestValidation = z.object({
  body: z.object({
    bookingID: z.string(),
    approved: z.boolean(),
  }),
});

export const processBookingResponseResponseValidation = z.object({});

export const rescheduleBookingRequestValidation = z.object({
  body: z.object({
    bookingID: z.string(),
    newAvailabilityBlockID: z.string(),
  }),
});

export const rescheduleBookingResponseValidation = z.object({});

export const cancelBookingRequestValidation = z.object({
  body: z.object({
    bookingID: z.string(),
  }),
});

export const cancelBookingResponseValidation = z.object({});
