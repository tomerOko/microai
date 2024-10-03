// consumers.ts

import { functionWrapper } from 'common-lib';
import {
  UserCreatedEventType,
  BookingRequestedEventType,
  BookingApprovedEventType,
  BookingRejectedEventType,
  CallEndedEventType,
  PaymentFailedEventType,
  PayoutProcessedEventType,
  ReviewSubmittedEventType,
  AuthFailureEventType,
  MessageSentEventType,
  DeliveryFailedEventType,
  BookingCancelledEventType,
  CallStartedEventType,
  NewPasswordSetEventType,
  ConsultantOnboardedEventType,
  PaymentProcessedEventType,
  PayoutFailedEventType,
  TopicAddedEventType,
  WeeklyScheduleUpdatedEventType,
  RecommendationsGeneratedEventType,
  // Event Names
  userEventsNames,
  bookingEventsNames,
  callEventsNames,
  paymentEventsNames,
  ratingEventsNames,
  authEventsNames,
  chatEventsNames,
  notificationEventsNames,
  consultantEventsNames,
  scheduleEventsNames,
  searchEventsNames,
} from './events';

import { EventHandlerFactory } from './utils/eventHandlerFactory';

/**
 * USER_CREATED
 */
export const handleUserCreatedEvent = async (event: UserCreatedEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(userEventsNames.USER_CREATED);
    await handler.handle(event);
  });
};

/**
 * BOOKING_REQUESTED
 */
export const handleBookingRequestedEvent = async (event: BookingRequestedEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(bookingEventsNames.BOOKING_REQUESTED);
    await handler.handle(event);
  });
};

/**
 * BOOKING_APPROVED
 */
export const handleBookingApprovedEvent = async (event: BookingApprovedEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(bookingEventsNames.BOOKING_APPROVED);
    await handler.handle(event);
  });
};

/**
 * BOOKING_REJECTED
 */
export const handleBookingRejectedEvent = async (event: BookingRejectedEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(bookingEventsNames.BOOKING_REJECTED);
    await handler.handle(event);
  });
};

/**
 * CALL_ENDED
 */
export const handleCallEndedEvent = async (event: CallEndedEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(callEventsNames.CALL_ENDED);
    await handler.handle(event);
  });
};

/**
 * PAYMENT_FAILED
 */
export const handlePaymentFailedEvent = async (event: PaymentFailedEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(paymentEventsNames.PAYMENT_FAILED);
    await handler.handle(event);
  });
};

/**
 * PAYOUT_PROCESSED
 */
export const handlePayoutProcessedEvent = async (event: PayoutProcessedEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(paymentEventsNames.PAYOUT_PROCESSED);
    await handler.handle(event);
  });
};

/**
 * REVIEW_SUBMITTED
 */
export const handleReviewSubmittedEvent = async (event: ReviewSubmittedEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(ratingEventsNames.REVIEW_SUBMITTED);
    await handler.handle(event);
  });
};

/**
 * AUTH_FAILURE
 */
export const handleAuthFailureEvent = async (event: AuthFailureEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(authEventsNames.AUTH_FAILURE);
    await handler.handle(event);
  });
};

/**
 * MESSAGE_SENT
 */
export const handleMessageSentEvent = async (event: MessageSentEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(chatEventsNames.MESSAGE_SENT);
    await handler.handle(event);
  });
};

/**
 * DELIVERY_FAILED
 */
export const handleDeliveryFailedEvent = async (event: DeliveryFailedEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(notificationEventsNames.DELIVERY_FAILED);
    await handler.handle(event);
  });
};

/**
 * BOOKING_CANCELLED
 */
export const handleBookingCancelledEvent = async (event: BookingCancelledEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(bookingEventsNames.BOOKING_CANCELLED);
    await handler.handle(event);
  });
};

/**
 * CALL_STARTED
 */
export const handleCallStartedEvent = async (event: CallStartedEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(callEventsNames.CALL_STARTED);
    await handler.handle(event);
  });
};

/**
 * NEW_PASSWORD_SET
 */
export const handleNewPasswordSetEvent = async (event: NewPasswordSetEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(authEventsNames.NEW_PASSWORD_SET);
    await handler.handle(event);
  });
};

/**
 * CONSULTANT_ONBOARDED
 */
export const handleConsultantOnboardedEvent = async (event: ConsultantOnboardedEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(consultantEventsNames.CONSULTANT_ONBOARDED);
    await handler.handle(event);
  });
};

/**
 * PAYMENT_PROCESSED
 */
export const handlePaymentProcessedEvent = async (event: PaymentProcessedEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(paymentEventsNames.PAYMENT_PROCESSED);
    await handler.handle(event);
  });
};

/**
 * PAYOUT_FAILED
 */
export const handlePayoutFailedEvent = async (event: PayoutFailedEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(paymentEventsNames.PAYOUT_FAILED);
    await handler.handle(event);
  });
};

/**
 * TOPIC_ADDED
 */
export const handleTopicAddedEvent = async (event: TopicAddedEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(consultantEventsNames.TOPIC_ADDED);
    await handler.handle(event);
  });
};

/**
 * WEEKLY_SCHEDULE_UPDATED
 */
export const handleWeeklyScheduleUpdatedEvent = async (event: WeeklyScheduleUpdatedEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(scheduleEventsNames.WEEKLY_SCHEDULE_UPDATED);
    await handler.handle(event);
  });
};

/**
 * RECOMMENDATIONS_GENERATED
 */
export const handleRecommendationsGeneratedEvent = async (event: RecommendationsGeneratedEventType['data']) => {
  return functionWrapper(async () => {
    const handler = EventHandlerFactory.getHandler(searchEventsNames.RECOMMENDATIONS_GENERATED);
    await handler.handle(event);
  });
};
