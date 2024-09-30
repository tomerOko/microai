// configs/rabbitMQ/initialization.ts
import {
  RabbitPublisherParams,
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import {
  BookingCreatedEventType,
  BookingCancelledEventType,
  CallStartedEventType,
  CallEndedEventType,
  bookingEventsNames,
  callEventsNames,
  bookingCreatedEventValidation,
  bookingCancelledEventValidation,
  callStartedEventValidation,
  callEndedEventValidation,
} from 'events-tomeroko3';

import {
  handleBookingCreatedEvent,
  handleBookingCancelledEvent,
} from '../logic/consumers';

export let callStartedPublisher: (data: CallStartedEventType['data']) => void;
export let callEndedPublisher: (data: CallEndedEventType['data']) => void;

const callStartedPublisherParams: RabbitPublisherParams<CallStartedEventType> = {
  eventName: callEventsNames.CALL_STARTED,
  eventSchema: callStartedEventValidation,
};

const callEndedPublisherParams: RabbitPublisherParams<CallEndedEventType> = {
  eventName: callEventsNames.CALL_ENDED,
  eventSchema: callEndedEventValidation,
};

const bookingCreatedSubscriberParams: RabbitSubscriberParams<BookingCreatedEventType> = {
  thisServiceName: 'CALLS_SERVICE',
  eventName: bookingEventsNames.BOOKING_CREATED,
  eventSchema: bookingCreatedEventValidation,
  handler: handleBookingCreatedEvent,
};

const bookingCancelledSubscriberParams: RabbitSubscriberParams<BookingCancelledEventType> = {
  thisServiceName: 'CALLS_SERVICE',
  eventName: bookingEventsNames.BOOKING_CANCELLED,
  eventSchema: bookingCancelledEventValidation,
  handler: handleBookingCancelledEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    // Initialize subscribers
    await initializeRabbitSubscriber(bookingCreatedSubscriberParams);
    await initializeRabbitSubscriber(bookingCancelledSubscriberParams);

    // Initialize publishers
    callStartedPublisher = await rabbitPublisherFactory(callStartedPublisherParams);
    callEndedPublisher = await rabbitPublisherFactory(callEndedPublisherParams);
  });
};
