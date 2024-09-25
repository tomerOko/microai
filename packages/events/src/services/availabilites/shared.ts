// availabilities.ts (shared validations)
import z from 'zod';

export const availabilityBlockValidationProps = {
  ID: z.string(),
  consultantID: z.string(),
  date: z.string(), // ISO date string
  startTime: z.string(), // e.g., "09:00"
  endTime: z.string(), // e.g., "10:00"
  maxBookings: z.number(),
  currentBookings: z.number(),
  status: z.enum(['available', 'full']),
};

export const consultantAvailabilityValidationProps = {
  ID: z.string(),
  consultantID: z.string(),
  defaultSchedule: z.array(
    z.object({
      dayOfWeek: z.number().min(0).max(6), // 0 = Sunday, 6 = Saturday
      startTime: z.string(),
      endTime: z.string(),
    }),
  ),
  weeklySchedules: z.record(
    z.string(), // week identifier, e.g., "2023-W01"
    z.array(
      z.object({
        dayOfWeek: z.number().min(0).max(6),
        startTime: z.string(),
        endTime: z.string(),
      }),
    ),
  ),
  availableNow: z.boolean().optional(),
};
