// consumers.ts
import {
  AvailabilityUpdatedEventType,
  AvailabilityBlockFullEventType,
  AvailabilityBlockAvailableEventType,
  BookingCancelledEventType,
} from 'events-tomeroko3';

import * as model from './dal';

// Handle Availability Updated Event
export const handleAvailabilityUpdatedEvent = async (event: AvailabilityUpdatedEventType['data']) => {
  // Update the availability block in the local database
  await model.updateAvailabilityBlock(event);
};

// Handle Availability Block Full Event
export const handleAvailabilityBlockFullEvent = async (event: AvailabilityBlockFullEventType['data']) => {
  // Update the block status to 'full' in the local database
  await model.setAvailabilityBlockStatus(event.blockID, 'full');
};

// Handle Availability Block Available Event
export const handleAvailabilityBlockAvailableEvent = async (
  event: AvailabilityBlockAvailableEventType['data'],
) => {
  // Update the block status to 'available' in the local database
  await model.setAvailabilityBlockStatus(event.blockID, 'available');
};

// Handle Booking Cancelled Event
export const handleBookingCancelledEvent = async (event: BookingCancelledEventType['data']) => {
  const { availabilityBlockID } = event;
  const availabilityBlock = await model.getAvailabilityBlockByID(availabilityBlockID);
  if (availabilityBlock) {
    // Decrease the current bookings count
    availabilityBlock.currentBookings = Math.max(availabilityBlock.currentBookings - 1, 0);

    // Update the block status if it was full
    if (availabilityBlock.status === 'full' && availabilityBlock.currentBookings < availabilityBlock.maxBookings) {
      availabilityBlock.status = 'available';
    }

    // Save the updated availability block
    await model.updateAvailabilityBlock(availabilityBlock);
  }
};
