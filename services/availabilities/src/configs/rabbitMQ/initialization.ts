// configs/rabbitMQ/initialization.ts
import {
  RabbitPublisherParams,
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import {
  DefaultScheduleSetEventType,
  WeeklyScheduleUpdatedEventType,
  AvailableNowStatusChangedEventType,
  AvailabilityUpdatedEventType,
  AvailabilityBlockFullEventType,
  AvailabilityBlockAvailableEventType,
  BookingCreatedEventType,
  BookingCancelledEventType,
  CallStartedEventType,
  CallEndedEventType,
  availabilitiesEventsNames,
  bookingEventsNames,
  callEventsNames,
  defaultScheduleSetEventValidation,
  weeklyScheduleUpdatedEventValidation,
  availableNowStatusChangedEventValidation,
  availabilityUpdatedEventValidation,
  availabilityBlockFullEventValidation,
  availabilityBlockAvailableEventValidation,
  bookingCreatedEventValidation,
  bookingCancelledEventValidation,
  callStartedEventValidation,
  callEndedEventValidation,
} from 'events-tomeroko3';

import {
  handleBookingCreatedEvent,
  handleBookingCancelledEvent,
  handleCallStartedEvent,
  handleCallEndedEvent,
} from '../../logic/consumers';

export let defaultScheduleSetPublisher: (data: DefaultScheduleSetEventType['data']) => void;
export let weeklyScheduleUpdatedPublisher: (data: WeeklyScheduleUpdatedEventType['data']) => void;
export let availableNowStatusChangedPublisher: (data: AvailableNowStatusChangedEventType['data']) => void;
export let availabilityUpdatedPublisher: (data: AvailabilityUpdatedEventType['data']) => void;
export let availabilityBlockFullPublisher: (data: AvailabilityBlockFullEventType['data']) => void;
export let availabilityBlockAvailablePublisher: (
  data: AvailabilityBlockAvailableEventType['data'],
) => void;

const defaultScheduleSetPublisherParams: RabbitPublisherParams<DefaultScheduleSetEventType> = {
  eventName: availabilitiesEventsNames.DEFAULT_SCHEDULE_SET,
  eventSchema: defaultScheduleSetEventValidation,
};

const weeklyScheduleUpdatedPublisherParams: RabbitPublisherParams<WeeklyScheduleUpdatedEventType> = {
  eventName: availabilitiesEventsNames.WEEKLY_SCHEDULE_UPDATED,
  eventSchema: weeklyScheduleUpdatedEventValidation,
};

const availableNowStatusChangedPublisherParams: RabbitPublisherParams<AvailableNowStatusChangedEventType> =
  {
    eventName: availabilitiesEventsNames.AVAILABLE_NOW_STATUS_CHANGED,
    eventSchema: availableNowStatusChangedEventValidation,
  };

const bookingCreatedSubscriberParams: RabbitSubscriberParams<BookingCreatedEventType> = {
  thisServiceName: 'AVAILABILITIES_SERVICE',
  eventName: bookingEventsNames.BOOKING_CREATED,
  eventSchema: bookingCreatedEventValidation,
  handler: handleBookingCreatedEvent,
};

const bookingCancelledSubscriberParams: RabbitSubscriberParams<BookingCancelledEventType> = {
  thisServiceName: 'AVAILABILITIES_SERVICE',
  eventName: bookingEventsNames.BOOKING_CANCELLED,
  eventSchema: bookingCancelledEventValidation,
  handler: handleBookingCancelledEvent,
};

const callStartedSubscriberParams: RabbitSubscriberParams<CallStartedEventType> = {
  thisServiceName: 'AVAILABILITIES_SERVICE',
  eventName: callEventsNames.CALL_STARTED,
  eventSchema: callStartedEventValidation,
  handler: handleCallStartedEvent,
};

const callEndedSubscriberParams: RabbitSubscriberParams<CallEndedEventType> = {
  thisServiceName: 'AVAILABILITIES_SERVICE',
  eventName: callEventsNames.CALL_ENDED,
  eventSchema: callEndedEventValidation,
  handler: handleCallEndedEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    await initializeRabbitSubscriber(bookingCreatedSubscriberParams);
    await initializeRabbitSubscriber(bookingCancelledSubscriberParams);
    await initializeRabbitSubscriber(callStartedSubscriberParams);
    await initializeRabbitSubscriber(callEndedSubscriberParams);
    defaultScheduleSetPublisher = await rabbitPublisherFactory(defaultScheduleSetPublisherParams);
    weeklyScheduleUpdatedPublisher = await rabbitPublisherFactory(
      weeklyScheduleUpdatedPublisherParams,
    );
    availableNowStatusChangedPublisher = await rabbitPublisherFactory(
      availableNowStatusChangedPublisherParams,
    );
  });
};
