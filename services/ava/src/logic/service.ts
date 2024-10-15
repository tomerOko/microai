// service.ts
import { AppError, functionWrapper, getAuthenticatedID } from 'common-lib-tomeroko3';
import {
  setDefaultScheduleRequestType,
  setDefaultScheduleResponseType,
  updateWeeklyScheduleRequestType,
  updateWeeklyScheduleResponseType,
  toggleAvailableNowRequestType,
  toggleAvailableNowResponseType,
  checkAvailabilityRequestType,
  checkAvailabilityResponseType,
} from 'events-tomeroko3';

import {
  defaultScheduleSetPublisher,
  weeklyScheduleUpdatedPublisher,
  availableNowStatusChangedPublisher,
  availabilityUpdatedPublisher,
  availabilityBlockFullPublisher,
  availabilityBlockAvailablePublisher,
} from '../configs/rabbitMQ/initialization';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';

export const setDefaultSchedule = async (
  props: setDefaultScheduleRequestType['body'],
): Promise<setDefaultScheduleResponseType> => {
  return functionWrapper(async () => {
    const consultantID = getAuthenticatedID() as string;
    const availability = {
      consultantID,
      defaultSchedule: props.defaultSchedule,
    };
    const existingAvailability = await model.getConsultantAvailabilityByConsultantID(consultantID);
    if (existingAvailability) {
      await model.updateConsultantAvailabilityByID(existingAvailability.ID, availability);
    } else {
      await model.createConsultantAvailability(availability);
    }
    defaultScheduleSetPublisher({ consultantID, defaultSchedule: props.defaultSchedule });
    return {};
  });
};

export const updateWeeklySchedule = async (
  props: updateWeeklyScheduleRequestType['body'],
): Promise<updateWeeklyScheduleResponseType> => {
  return functionWrapper(async () => {
    const consultantID = getAuthenticatedID() as string;
    const { week, schedule } = props;
    const availability = await model.getConsultantAvailabilityByConsultantID(consultantID);
    if (!availability) {
      throw new AppError(appErrorCodes.AVAILABILITY_NOT_FOUND, { consultantID });
    }
    const updatedWeeklySchedules = {
      ...availability.weeklySchedules,
      [week]: schedule,
    };
    await model.updateConsultantAvailabilityByID(availability.ID, {
      weeklySchedules: updatedWeeklySchedules,
    });
    weeklyScheduleUpdatedPublisher({ consultantID, week, schedule });
    return {};
  });
};

export const toggleAvailableNow = async (
  props: toggleAvailableNowRequestType['body'],
): Promise<toggleAvailableNowResponseType> => {
  return functionWrapper(async () => {
    const consultantID = getAuthenticatedID() as string;
    const { availableNow } = props;
    const availability = await model.getConsultantAvailabilityByConsultantID(consultantID);
    if (!availability) {
      throw new AppError(appErrorCodes.AVAILABILITY_NOT_FOUND, { consultantID });
    }
    await model.updateConsultantAvailabilityByID(availability.ID, { availableNow });
    availableNowStatusChangedPublisher({ consultantID, availableNow });
    return {};
  });
};

export const checkAvailability = async (
  props: checkAvailabilityRequestType['query'],
): Promise<checkAvailabilityResponseType> => {
  return functionWrapper(async () => {
    const { consultantID, date } = props;
    // Logic to check availability blocks for the given consultant and date
    const isAvailable = await someAvailabilityCheckFunction(consultantID, date);
    return { isAvailable };
  });
};

// Placeholder function for checking availability
async function someAvailabilityCheckFunction(consultantID: string, date: string): Promise<boolean> {
  // Implement the logic to check availability
  return true;
}
