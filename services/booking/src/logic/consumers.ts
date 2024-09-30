// consumers.ts
import {
  AvailabilityUpdatedEventType,
  AvailabilityBlockFullEventType,
  AvailabilityBlockAvailableEventType,
} from 'events-tomeroko3';

import * as model from './dal';

// Handle Availability Updated Event
export const handleAvailabilityUpdatedEvent = async (event: AvailabilityUpdatedEventType['data']) => {
  // Update the availability status in local cache or database
  await model.updateAvailabilityBlock(event);
};

// Handle Availability Block Full Event
export const handleAvailabilityBlockFullEvent = async (event: AvailabilityBlockFullEventType['data']) => {
  // Update the block status to 'full' in local cache or database
  await model.setAvailabilityBlockStatus(event.blockID, 'full');
};

// Handle Availability Block Available Event
export const handleAvailabilityBlockAvailableEvent = async (
  event: AvailabilityBlockAvailableEventType['data'],
) => {
  // Update the block status to 'available' in local cache or database
  await model.setAvailabilityBlockStatus(event.blockID, 'available');
};
