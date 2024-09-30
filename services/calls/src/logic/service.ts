/**
 * Business Logic Explanation:

scheduleCall:
Creates a Jitsi meeting room for the call.
Stores call details in the database with status 'scheduled'.
Optionally notifies participants about the scheduled call.
startCall:
Validates that the user is a participant.
Updates the call status to 'in-progress'.
Publishes a CALL_STARTED event.
Returns the call URL for the user to join the meeting.
endCall:
Validates that the user is a participant.
Updates the call status to 'completed'.
Ends the Jitsi meeting if necessary.
Publishes a CALL_ENDED event.
getCallDetails:
Retrieves call details if the user is a participant.
 */
import { AppError, functionWrapper, getAuthenticatedID } from 'common-lib-tomeroko3';
import {
  scheduleCallPropsType,
  startCallRequestType,
  startCallResponseType,
  endCallRequestType,
  endCallResponseType,
  getCallDetailsRequestType,
  getCallDetailsResponseType,
} from 'events-tomeroko3';

import {
  callStartedPublisher,
  callEndedPublisher,
} from '../configs/rabbitMQ/initialization';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';
import { createJitsiMeeting, endJitsiMeeting } from './utils/jitsi';

export const scheduleCall = async (props: scheduleCallPropsType) => {
  return functionWrapper(async () => {
    const { bookingID, studentID, consultantID, availabilityBlockID } = props;

    // Create a Jitsi meeting room
    const meetingInfo = await createJitsiMeeting(bookingID);

    const call = {
      bookingID,
      studentID,
      consultantID,
      availabilityBlockID,
      callURL: meetingInfo.callURL,
      meetingID: meetingInfo.meetingID,
      status: 'scheduled' as const,
      scheduledAt: new Date().toISOString(),
    };

    // Save the call details in the database
    await model.createCall(call);

    // Optionally, send notifications to the participants with the call details
  });
};

export const cancelScheduledCall = async (bookingID: string) => {
  return functionWrapper(async () => {
    // Delete the call record
    await model.deleteCallByBookingID(bookingID);

    // Perform any additional cleanup if necessary
  });
};

export const startCall = async (
  props: startCallRequestType['body'],
): Promise<startCallResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const { callID } = props;

    const call = await model.getCallByID(callID);
    if (!call) {
      throw new AppError(appErrorCodes.CALL_NOT_FOUND, { callID });
    }

    // Check if user is a participant
    if (![call.studentID, call.consultantID].includes(userID)) {
      throw new AppError(appErrorCodes.UNAUTHORIZED_ACTION, { callID, userID });
    }

    // Update call status to 'in-progress'
    await model.updateCallStatus(callID, 'in-progress');

    // Publish CALL_STARTED event
    callStartedPublisher({ callID, bookingID: call.bookingID, participants: [call.studentID, call.consultantID] });

    return { callURL: call.callURL };
  });
};

export const endCall = async (
  props: endCallRequestType['body'],
): Promise<endCallResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const { callID } = props;

    const call = await model.getCallByID(callID);
    if (!call) {
      throw new AppError(appErrorCodes.CALL_NOT_FOUND, { callID });
    }

    // Check if user is a participant
    if (![call.studentID, call.consultantID].includes(userID)) {
      throw new AppError(appErrorCodes.UNAUTHORIZED_ACTION, { callID, userID });
    }

    // Update call status to 'completed'
    await model.updateCallStatus(callID, 'completed');

    // End the Jitsi meeting if necessary
    await endJitsiMeeting(call.meetingID);

    // Publish CALL_ENDED event
    callEndedPublisher({ callID, bookingID: call.bookingID, participants: [call.studentID, call.consultantID] });

    return {};
  });
};

export const getCallDetails = async (
  props: getCallDetailsRequestType['params'],
): Promise<getCallDetailsResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const { callID } = props;

    const call = await model.getCallByID(callID);
    if (!call) {
      throw new AppError(appErrorCodes.CALL_NOT_FOUND, { callID });
    }

    // Check if user is a participant
    if (![call.studentID, call.consultantID].includes(userID)) {
      throw new AppError(appErrorCodes.UNAUTHORIZED_ACTION, { callID, userID });
    }

    return {
      callID: callID,
      bookingID: call.bookingID,
      studentID: call.studentID,
      consultantID: call.consultantID,
      callURL: call.callURL,
      status: call.status,
      scheduledAt: call.scheduledAt,
    };
  });
};
