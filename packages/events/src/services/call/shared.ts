// calls.ts (shared validations)
import z from 'zod';

export const callValidationProps = {
  ID: z.string().optional(),
  bookingID: z.string(),
  studentID: z.string(),
  consultantID: z.string(),
  availabilityBlockID: z.string(),
  callURL: z.string(),
  meetingID: z.string(),
  status: z.enum(['scheduled', 'in-progress', 'completed', 'cancelled']),
  scheduledAt: z.string(), // ISO date string
};
