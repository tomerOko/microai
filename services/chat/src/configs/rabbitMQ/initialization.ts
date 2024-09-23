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
  UserUpdatedEventType,
  MessageSentEventType,
  bookingEventsNames,
  userEventsNames,
  chatEventsNames,
  bookingCreatedEventValidation,
  bookingCancelledEventValidation,
  userUpdatedEventValidation,
  messageSentEventValidation,
} from 'events-tomeroko3';

import {
  handleBookingCreatedEvent,
  handleBookingCancelledEvent,
  handleUserUpdatedEvent,
} from '../logic/consumers';

export let messageSentPublisher: (data: MessageSentEventType['data']) => void;

const messageSentPublisherParams: RabbitPublisherParams<MessageSentEventType> = {
  eventName: chatEventsNames.MESSAGE_SENT,
  eventSchema: messageSentEventValidation,
};

const bookingCreatedSubscriberParams: RabbitSubscriberParams<BookingCreatedEventType> = {
  thisServiceName: 'CHAT_SERVICE',
  eventName: bookingEventsNames.BOOKING_CREATED,
  eventSchema: bookingCreatedEventValidation,
  handler: handleBookingCreatedEvent,
};

const bookingCancelledSubscriberParams: RabbitSubscriberParams<BookingCancelledEventType> = {
  thisServiceName: 'CHAT_SERVICE',
  eventName: bookingEventsNames.BOOKING_CANCELLED,
  eventSchema: bookingCancelledEventValidation,
  handler: handleBookingCancelledEvent,
};

const userUpdatedSubscriberParams: RabbitSubscriberParams<UserUpdatedEventType> = {
  thisServiceName: 'CHAT_SERVICE',
  eventName: userEventsNames.USER_UPDATED,
  eventSchema: userUpdatedEventValidation,
  handler: handleUserUpdatedEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    // Initialize subscribers
    await initializeRabbitSubscriber(bookingCreatedSubscriberParams);
    await initializeRabbitSubscriber(bookingCancelledSubscriberParams);
    await initializeRabbitSubscriber(userUpdatedSubscriberParams);

    // Initialize publishers
    messageSentPublisher = await rabbitPublisherFactory(messageSentPublisherParams);
  });
};
