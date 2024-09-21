// availabilities.ts (message queue events validations)
import { z } from 'zod';
import { availabilitiesEventsNames } from '../names';
import { consultantAvailabilityValidationProps, availabilityBlockValidationProps } from '../../shared/validations/availabilities';

export const defaultScheduleSetEventValidation = z.object({
  type: z.literal(availabilitiesEventsNames.DEFAULT_SCHEDULE_SET),
  data: z.object({
    consultantID: z.string(),
    defaultSchedule: consultantAvailabilityValidationProps.defaultSchedule,
  }),
});

export const weeklyScheduleUpdatedEventValidation = z.object({
  type: z.literal(availabilitiesEventsNames.WEEKLY_SCHEDULE_UPDATED),
  data: z.object({
    consultantID: z.string(),
    week: z.string(),
    schedule: consultantAvailabilityValidationProps.defaultSchedule,
  }),
});

export const availableNowStatusChangedEventValidation = z.object({
  type: z.literal(availabilitiesEventsNames.AVAILABLE_NOW_STATUS_CHANGED),
  data: z.object({
    consultantID: z.string(),
    availableNow: z.boolean(),
  }),
});

export const availabilityUpdatedEventValidation = z.object({
  type: z.literal(availabilitiesEventsNames.AVAILABILITY_UPDATED),
  data: z.object(availabilityBlockValidationProps),
});

export const availabilityBlockFullEventValidation = z.object({
  type: z.literal(availabilitiesEventsNames.AVAILABILITY_BLOCK_FULL),
  data: z.object({
    blockID: z.string(),
  }),
});

export const availabilityBlockAvailableEventValidation = z.object({
  type: z.literal(availabilitiesEventsNames.AVAILABILITY_BLOCK_AVAILABLE),
  data: z.object({
    blockID: z.string(),
  }),
});
