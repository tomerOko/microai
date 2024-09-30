// consumers.ts
import {
  BookingCreatedEventType,
  BookingCancelledEventType,
  CallStartedEventType,
  CallEndedEventType,
} from 'events-tomeroko3';

import * as model from './dal';
import {
  availabilityUpdatedPublisher,
  availabilityBlockFullPublisher,
  availabilityBlockAvailablePublisher,
  availableNowStatusChangedPublisher,
} from '../configs/rabbitMQ/initialization';

// Handle Booking Created Event
export const handleBookingCreatedEvent = async (event: BookingCreatedEventType['data']) => {
  const { availabilityBlockID } = event;
  const block = await model.getAvailabilityBlockByID(availabilityBlockID);
  if (!block) return;

  block.currentBookings += 1;
  if (block.currentBookings >= block.maxBookings) {
    block.status = 'full';
    await model.updateAvailabilityBlockByID(block.ID, block);
    availabilityBlockFullPublisher({ blockID: block.ID });
  } else {
    await model.updateAvailabilityBlockByID(block.ID, block);
  }
  availabilityUpdatedPublisher(block);
};

// Handle Booking Cancelled Event
export const handleBookingCancelledEvent = async (event: BookingCancelledEventType['data']) => {
  const { availabilityBlockID } = event;
  const block = await model.getAvailabilityBlockByID(availabilityBlockID);
  if (!block) return;

  block.currentBookings = Math.max(block.currentBookings - 1, 0);
  if (block.status === 'full' && block.currentBookings < block.maxBookings) {
    block.status = 'available';
    await model.updateAvailabilityBlockByID(block.ID, block);
    availabilityBlockAvailablePublisher({ blockID: block.ID });
  } else {
    await model.updateAvailabilityBlockByID(block.ID, block);
  }
  availabilityUpdatedPublisher(block);
};

// Handle Call Started Event
export const handleCallStartedEvent = async (event: CallStartedEventType['data']) => {
  const { consultantID } = event;
  const availability = await model.getConsultantAvailabilityByConsultantID(consultantID);
  if (!availability || !availability.availableNow) return;

  availability.availableNow = false;
  await model.updateConsultantAvailabilityByID(availability.ID, availability);
  availableNowStatusChangedPublisher({ consultantID, availableNow: false });
};

// Handle Call Ended Event
export const handleCallEndedEvent = async (event: CallEndedEventType['data']) => {
  const { consultantID } = event;
  const availability = await model.getConsultantAvailabilityByConsultantID(consultantID);
  if (!availability) return;

  // Assume consultants want to reset 'available now' status after call ends
  availability.availableNow = true;
  await model.updateConsultantAvailabilityByID(availability.ID, availability);
  availableNowStatusChangedPublisher({ consultantID, availableNow: true });
};
