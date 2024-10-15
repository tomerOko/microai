// consumers.ts
import {
  BookingCreatedEventType,
  BookingCancelledEventType,
  CallStartedEventType,
  CallEndedEventType,
} from 'events-tomeroko3';

import * as service from './service';

export const handleBookingCreatedEvent = async (event: BookingCreatedEventType['data']) => {
  const { bookingID, studentID, consultantID, availabilityBlockID } = event;

  // Schedule a call for the booking
  await service.scheduleCall({
    bookingID,
    studentID,
    consultantID,
    availabilityBlockID,
  });
};

export const handleBookingCancelledEvent = async (event: BookingCancelledEventType['data']) => {
  const { bookingID } = event;

  // Cancel the scheduled call
  await service.cancelScheduledCall(bookingID);
};

export const handleCallStartedEvent = async (event: CallStartedEventType['data']) => {
  const { callID } = event;

  // Update call status to 'in-progress'
  await service.updateCallStatus(callID, 'in-progress');
};

export const handleCallEndedEvent = async (event: CallEndedEventType['data']) => {
  const { callID } = event;

  // Update call status to 'completed'
  await service.updateCallStatus(callID, 'completed');
};
