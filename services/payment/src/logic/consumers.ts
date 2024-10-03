// consumers.ts
import { CallEndedEventType } from 'tomeroko3-events';
import * as service from './service';

// Handle Call Ended Event
export const handleCallEndedEvent = async (event: CallEndedEventType['data']) => {
  const { callID, bookingID } = event;

  // Process payment after call has ended
  await service.processPayment(bookingID);
};
