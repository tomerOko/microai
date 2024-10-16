// availabilities.ts (request and response types)
import * as z from 'zod';
import {
  setDefaultScheduleRequestValidation,
  setDefaultScheduleResponseValidation,
  updateWeeklyScheduleRequestValidation,
  updateWeeklyScheduleResponseValidation,
  toggleAvailableNowRequestValidation,
  toggleAvailableNowResponseValidation,
  checkAvailabilityRequestValidation,
  checkAvailabilityResponseValidation,
} from './reqResValidations';

export type SetDefaultScheduleRequestType = z.infer<typeof setDefaultScheduleRequestValidation>;
export type SetDefaultScheduleResponseType = z.infer<typeof setDefaultScheduleResponseValidation>;

export type UpdateWeeklyScheduleRequestType = z.infer<typeof updateWeeklyScheduleRequestValidation>;
export type UpdateWeeklyScheduleResponseType = z.infer<typeof updateWeeklyScheduleResponseValidation>;

export type ToggleAvailableNowRequestType = z.infer<typeof toggleAvailableNowRequestValidation>;
export type ToggleAvailableNowResponseType = z.infer<typeof toggleAvailableNowResponseValidation>;

export type CheckAvailabilityRequestType = z.infer<typeof checkAvailabilityRequestValidation>;
export type CheckAvailabilityResponseType = z.infer<typeof checkAvailabilityResponseValidation>;
