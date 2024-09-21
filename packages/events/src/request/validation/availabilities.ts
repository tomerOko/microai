// availabilities.ts (request and response validations)
import { z } from 'zod';
import { consultantAvailabilityValidationProps } from '../../shared/validations/availabilities';

export const setDefaultScheduleRequestValidation = z.object({
  body: z.object({
    defaultSchedule: consultantAvailabilityValidationProps.defaultSchedule,
  }),
});

export const setDefaultScheduleResponseValidation = z.object({});

export const updateWeeklyScheduleRequestValidation = z.object({
  body: z.object({
    week: z.string(), // e.g., "2023-W01"
    schedule: consultantAvailabilityValidationProps.defaultSchedule,
  }),
});

export const updateWeeklyScheduleResponseValidation = z.object({});

export const toggleAvailableNowRequestValidation = z.object({
  body: z.object({
    availableNow: z.boolean(),
  }),
});

export const toggleAvailableNowResponseValidation = z.object({});

export const checkAvailabilityRequestValidation = z.object({
  query: z.object({
    consultantID: z.string(),
    date: z.string(), // ISO date string
  }),
});

export const checkAvailabilityResponseValidation = z.object({
  isAvailable: z.boolean(),
});
