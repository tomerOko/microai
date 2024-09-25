// availabilities.ts (message queue events types)
import * as z from 'zod';
import {
  defaultScheduleSetEventValidation,
  weeklyScheduleUpdatedEventValidation,
  availableNowStatusChangedEventValidation,
  availabilityUpdatedEventValidation,
  availabilityBlockFullEventValidation,
  availabilityBlockAvailableEventValidation,
} from '../validations/availabilities';

export type DefaultScheduleSetEventType = z.infer<typeof defaultScheduleSetEventValidation>;
export type WeeklyScheduleUpdatedEventType = z.infer<typeof weeklyScheduleUpdatedEventValidation>;
export type AvailableNowStatusChangedEventType = z.infer<typeof availableNowStatusChangedEventValidation>;
export type AvailabilityUpdatedEventType = z.infer<typeof availabilityUpdatedEventValidation>;
export type AvailabilityBlockFullEventType = z.infer<typeof availabilityBlockFullEventValidation>;
export type AvailabilityBlockAvailableEventType = z.infer<typeof availabilityBlockAvailableEventValidation>;
