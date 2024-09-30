// bookings.ts (shared validations)
import z from 'zod';

export const bookingValidationProps = {
  ID: z.string(),
  bookingID: z.string(),
  studentID: z.string(),
  consultantID: z.string(),
  availabilityBlockID: z.string(),
  status: z.enum(['pending', 'approved', 'rejected', 'cancelled', 'rescheduled']),
  details: z.object({
    message: z.string().optional(),
    // Additional details can be added here
  }),
  createdAt: z.string(),
};
