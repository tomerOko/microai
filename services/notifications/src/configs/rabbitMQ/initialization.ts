// configs/rabbitMQ/initialization.ts
import {
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
} from 'common-lib-tomeroko3';
import {
  BookingRequestedEventType,
  BookingApprovedEventType,
  BookingRejectedEventType,
  BookingCancelledEventType,
  BookingRescheduledEventType,
  MessageSentEventType,
  ConsultantOnboardedEventType,
  bookingEventsNames,
  chatEventsNames,
  consultantEventsNames,
  bookingRequestedEventValidation,
  bookingApprovedEventValidation,
  bookingRejectedEventValidation,
  bookingCancelledEventValidation,
  bookingRescheduledEventValidation,
  messageSentEventValidation,
  consultantOnboardedEventValidation,
} from 'events-tomeroko3';

import {
  handleBookingRequestedEvent,
  handleBookingApprovedEvent,
  handleBookingRejectedEvent,
  handleBookingCancelledEvent,
  handleBookingRescheduledEvent,
  handleMessageSentEvent,
  handleConsultantOnboardedEvent,
} from '../logic/consumers';

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    // Initialize subscribers
    await initializeRabbitSubscriber({
      thisServiceName: 'NOTIFICATIONS_SERVICE',
      eventName: bookingEventsNames.BOOKING_REQUESTED,
      eventSchema: bookingRequestedEventValidation,
      handler: handleBookingRequestedEvent,
    });
    await initializeRabbitSubscriber({
      thisServiceName: 'NOTIFICATIONS_SERVICE',
      eventName: bookingEventsNames.BOOKING_APPROVED,
      eventSchema: bookingApprovedEventValidation,
      handler: handleBookingApprovedEvent,
    });
    await initializeRabbitSubscriber({
      thisServiceName: 'NOTIFICATIONS_SERVICE',
      eventName: bookingEventsNames.BOOKING_REJECTED,
      eventSchema: bookingRejectedEventValidation,
      handler: handleBookingRejectedEvent,
    });
    await initializeRabbitSubscriber({
      thisServiceName: 'NOTIFICATIONS_SERVICE',
      eventName: bookingEventsNames.BOOKING_CANCELLED,
      eventSchema: bookingCancelledEventValidation,
      handler: handleBookingCancelledEvent,
    });
    await initializeRabbitSubscriber({
      thisServiceName: 'NOTIFICATIONS_SERVICE',
      eventName: bookingEventsNames.BOOKING_RESCHEDULED,
      eventSchema: bookingRescheduledEventValidation,
      handler: handleBookingRescheduledEvent,
    });
    await initializeRabbitSubscriber({
      thisServiceName: 'NOTIFICATIONS_SERVICE',
      eventName: chatEventsNames.MESSAGE_SENT,
      eventSchema: messageSentEventValidation,
      handler: handleMessageSentEvent,
    });
    await initializeRabbitSubscriber({
      thisServiceName: 'NOTIFICATIONS_SERVICE',
      eventName: consultantEventsNames.CONSULTANT_ONBOARDED,
      eventSchema: consultantOnboardedEventValidation,
      handler: handleConsultantOnboardedEvent,
    });
  });
};
