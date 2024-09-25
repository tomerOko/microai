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
} from '../validation/availabilities';

export type setDefaultScheduleRequestType = z.infer<typeof setDefaultScheduleRequestValidation>;
export type setDefaultScheduleResponseType = z.infer<typeof setDefaultScheduleResponseValidation>;

export type updateWeeklyScheduleRequestType = z.infer<typeof updateWeeklyScheduleRequestValidation>;
export type updateWeeklyScheduleResponseType = z.infer<typeof updateWeeklyScheduleResponseValidation>;

export type toggleAvailableNowRequestType = z.infer<typeof toggleAvailableNowRequestValidation>;
export type toggleAvailableNowResponseType = z.infer<typeof toggleAvailableNowResponseValidation>;

export type checkAvailabilityRequestType = z.infer<typeof checkAvailabilityRequestValidation>;
export type checkAvailabilityResponseType = z.infer<typeof checkAvailabilityResponseValidation>;
