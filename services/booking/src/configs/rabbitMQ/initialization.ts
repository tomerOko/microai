// configs/rabbitMQ/initialization.ts
import {
  RabbitPublisherParams,
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import {
  AvailabilityBlockAvailableEventType,
  AvailabilityBlockFullEventType,
  AvailabilityUpdatedEventType,
  BookingApprovedEventType,
  BookingCancelledEventType,
  BookingCreatedEventType,
  BookingRejectedEventType,
  BookingRequestedEventType,
  BookingRescheduledEventType,
  availabilitiesEventsNames,
  availabilityBlockAvailableEventValidation,
  availabilityBlockFullEventValidation,
  availabilityUpdatedEventValidation,
  bookingApprovedEventValidation,
  bookingCancelledEventValidation,
  bookingCreatedEventValidation,
  bookingEventsNames,
  bookingRejectedEventValidation,
  bookingRequestedEventValidation,
  bookingRescheduledEventValidation,
} from 'events-tomeroko3';

import {
  handleAvailabilityBlockAvailableEvent,
  handleAvailabilityBlockFullEvent,
  handleAvailabilityUpdatedEvent,
  handleBookingCancelledEvent,
} from '../../logic/consumers';

export let bookingRequestedPublisher: (data: BookingRequestedEventType['data']) => void;
export let bookingApprovedPublisher: (data: BookingApprovedEventType['data']) => void;
export let bookingRejectedPublisher: (data: BookingRejectedEventType['data']) => void;
export let bookingCreatedPublisher: (data: BookingCreatedEventType['data']) => void;
export let bookingCancelledPublisher: (data: BookingCancelledEventType['data']) => void;
export let bookingRescheduledPublisher: (data: BookingRescheduledEventType['data']) => void;

const bookingRequestedPublisherParams: RabbitPublisherParams<BookingRequestedEventType> = {
  eventName: bookingEventsNames.BOOKING_REQUESTED,
  eventSchema: bookingRequestedEventValidation,
};

const bookingApprovedPublisherParams: RabbitPublisherParams<BookingApprovedEventType> = {
  eventName: bookingEventsNames.BOOKING_APPROVED,
  eventSchema: bookingApprovedEventValidation,
};

const bookingRejectedPublisherParams: RabbitPublisherParams<BookingRejectedEventType> = {
  eventName: bookingEventsNames.BOOKING_REJECTED,
  eventSchema: bookingRejectedEventValidation,
};

const bookingCreatedPublisherParams: RabbitPublisherParams<BookingCreatedEventType> = {
  eventName: bookingEventsNames.BOOKING_CREATED,
  eventSchema: bookingCreatedEventValidation,
};

const bookingCancelledPublisherParams: RabbitPublisherParams<BookingCancelledEventType> = {
  eventName: bookingEventsNames.BOOKING_CANCELLED,
  eventSchema: bookingCancelledEventValidation,
};

const bookingRescheduledPublisherParams: RabbitPublisherParams<BookingRescheduledEventType> = {
  eventName: bookingEventsNames.BOOKING_RESCHEDULED,
  eventSchema: bookingRescheduledEventValidation,
};

const availabilityUpdatedSubscriberParams: RabbitSubscriberParams<AvailabilityUpdatedEventType> = {
  thisServiceName: 'BOOKING_SERVICE',
  eventName: availabilitiesEventsNames.AVAILABILITY_UPDATED,
  eventSchema: availabilityUpdatedEventValidation,
  handler: handleAvailabilityUpdatedEvent,
};

const availabilityBlockFullSubscriberParams: RabbitSubscriberParams<AvailabilityBlockFullEventType> = {
  thisServiceName: 'BOOKING_SERVICE',
  eventName: availabilitiesEventsNames.AVAILABILITY_BLOCK_FULL,
  eventSchema: availabilityBlockFullEventValidation,
  handler: handleAvailabilityBlockFullEvent,
};

const availabilityBlockAvailableSubscriberParams: RabbitSubscriberParams<AvailabilityBlockAvailableEventType> =
  {
    thisServiceName: 'BOOKING_SERVICE',
    eventName: availabilitiesEventsNames.AVAILABILITY_BLOCK_AVAILABLE,
    eventSchema: availabilityBlockAvailableEventValidation,
    handler: handleAvailabilityBlockAvailableEvent,
  };

const bookingCancelledSubscriberParams: RabbitSubscriberParams<BookingCancelledEventType> = {
  thisServiceName: 'BOOKING_SERVICE',
  eventName: bookingEventsNames.BOOKING_CANCELLED,
  eventSchema: bookingCancelledEventValidation,
  handler: handleBookingCancelledEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    // Initialize subscribers
    await initializeRabbitSubscriber(availabilityUpdatedSubscriberParams);
    await initializeRabbitSubscriber(availabilityBlockFullSubscriberParams);
    await initializeRabbitSubscriber(availabilityBlockAvailableSubscriberParams);
    await initializeRabbitSubscriber(bookingCancelledSubscriberParams);

    // Initialize publishers
    bookingRequestedPublisher = await rabbitPublisherFactory(bookingRequestedPublisherParams);
    bookingApprovedPublisher = await rabbitPublisherFactory(bookingApprovedPublisherParams);
    bookingRejectedPublisher = await rabbitPublisherFactory(bookingRejectedPublisherParams);
    bookingCreatedPublisher = await rabbitPublisherFactory(bookingCreatedPublisherParams);
    bookingCancelledPublisher = await rabbitPublisherFactory(bookingCancelledPublisherParams);
    bookingRescheduledPublisher = await rabbitPublisherFactory(bookingRescheduledPublisherParams);
  });
};



