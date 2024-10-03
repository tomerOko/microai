// configs/rabbitMQ/initialization.ts

import {
  RabbitSubscriberParams,
  RabbitPublisherParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib';
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
  NotificationEventType,
  // Event Names and Validations
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
  userCreatedEventValidation,
  bookingRequestedEventValidation,
  bookingApprovedEventValidation,
  bookingRejectedEventValidation,
  callEndedEventValidation,
  paymentFailedEventValidation,
  payoutProcessedEventValidation,
  reviewSubmittedEventValidation,
  authFailureEventValidation,
  messageSentEventValidation,
  deliveryFailedEventValidation,
  bookingCancelledEventValidation,
  callStartedEventValidation,
  newPasswordSetEventValidation,
  consultantOnboardedEventValidation,
  paymentProcessedEventValidation,
  payoutFailedEventValidation,
  topicAddedEventValidation,
  weeklyScheduleUpdatedEventValidation,
  recommendationsGeneratedEventValidation,
  notificationEventValidation,
} from '../events';

import {
  handleUserCreatedEvent,
  handleBookingRequestedEvent,
  handleBookingApprovedEvent,
  handleBookingRejectedEvent,
  handleCallEndedEvent,
  handlePaymentFailedEvent,
  handlePayoutProcessedEvent,
  handleReviewSubmittedEvent,
  handleAuthFailureEvent,
  handleMessageSentEvent,
  handleDeliveryFailedEvent,
  handleBookingCancelledEvent,
  handleCallStartedEvent,
  handleNewPasswordSetEvent,
  handleConsultantOnboardedEvent,
  handlePaymentProcessedEvent,
  handlePayoutFailedEvent,
  handleTopicAddedEvent,
  handleWeeklyScheduleUpdatedEvent,
  handleRecommendationsGeneratedEvent,
} from '../consumers';

// Subscribers

const userCreatedSubscriberParams: RabbitSubscriberParams<UserCreatedEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: userEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
  handler: handleUserCreatedEvent,
};

const bookingRequestedSubscriberParams: RabbitSubscriberParams<BookingRequestedEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: bookingEventsNames.BOOKING_REQUESTED,
  eventSchema: bookingRequestedEventValidation,
  handler: handleBookingRequestedEvent,
};

const bookingApprovedSubscriberParams: RabbitSubscriberParams<BookingApprovedEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: bookingEventsNames.BOOKING_APPROVED,
  eventSchema: bookingApprovedEventValidation,
  handler: handleBookingApprovedEvent,
};

const bookingRejectedSubscriberParams: RabbitSubscriberParams<BookingRejectedEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: bookingEventsNames.BOOKING_REJECTED,
  eventSchema: bookingRejectedEventValidation,
  handler: handleBookingRejectedEvent,
};

const callEndedSubscriberParams: RabbitSubscriberParams<CallEndedEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: callEventsNames.CALL_ENDED,
  eventSchema: callEndedEventValidation,
  handler: handleCallEndedEvent,
};

const paymentFailedSubscriberParams: RabbitSubscriberParams<PaymentFailedEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: paymentEventsNames.PAYMENT_FAILED,
  eventSchema: paymentFailedEventValidation,
  handler: handlePaymentFailedEvent,
};

const payoutProcessedSubscriberParams: RabbitSubscriberParams<PayoutProcessedEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: paymentEventsNames.PAYOUT_PROCESSED,
  eventSchema: payoutProcessedEventValidation,
  handler: handlePayoutProcessedEvent,
};

const reviewSubmittedSubscriberParams: RabbitSubscriberParams<ReviewSubmittedEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: ratingEventsNames.REVIEW_SUBMITTED,
  eventSchema: reviewSubmittedEventValidation,
  handler: handleReviewSubmittedEvent,
};

const authFailureSubscriberParams: RabbitSubscriberParams<AuthFailureEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: authEventsNames.AUTH_FAILURE,
  eventSchema: authFailureEventValidation,
  handler: handleAuthFailureEvent,
};

const messageSentSubscriberParams: RabbitSubscriberParams<MessageSentEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: chatEventsNames.MESSAGE_SENT,
  eventSchema: messageSentEventValidation,
  handler: handleMessageSentEvent,
};

const deliveryFailedSubscriberParams: RabbitSubscriberParams<DeliveryFailedEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: notificationEventsNames.DELIVERY_FAILED,
  eventSchema: deliveryFailedEventValidation,
  handler: handleDeliveryFailedEvent,
};

const bookingCancelledSubscriberParams: RabbitSubscriberParams<BookingCancelledEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: bookingEventsNames.BOOKING_CANCELLED,
  eventSchema: bookingCancelledEventValidation,
  handler: handleBookingCancelledEvent,
};

const callStartedSubscriberParams: RabbitSubscriberParams<CallStartedEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: callEventsNames.CALL_STARTED,
  eventSchema: callStartedEventValidation,
  handler: handleCallStartedEvent,
};

const newPasswordSetSubscriberParams: RabbitSubscriberParams<NewPasswordSetEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: authEventsNames.NEW_PASSWORD_SET,
  eventSchema: newPasswordSetEventValidation,
  handler: handleNewPasswordSetEvent,
};

const consultantOnboardedSubscriberParams: RabbitSubscriberParams<ConsultantOnboardedEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: consultantEventsNames.CONSULTANT_ONBOARDED,
  eventSchema: consultantOnboardedEventValidation,
  handler: handleConsultantOnboardedEvent,
};

const paymentProcessedSubscriberParams: RabbitSubscriberParams<PaymentProcessedEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: paymentEventsNames.PAYMENT_PROCESSED,
  eventSchema: paymentProcessedEventValidation,
  handler: handlePaymentProcessedEvent,
};

const payoutFailedSubscriberParams: RabbitSubscriberParams<PayoutFailedEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: paymentEventsNames.PAYOUT_FAILED,
  eventSchema: payoutFailedEventValidation,
  handler: handlePayoutFailedEvent,
};

const topicAddedSubscriberParams: RabbitSubscriberParams<TopicAddedEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: consultantEventsNames.TOPIC_ADDED,
  eventSchema: topicAddedEventValidation,
  handler: handleTopicAddedEvent,
};

const weeklyScheduleUpdatedSubscriberParams: RabbitSubscriberParams<WeeklyScheduleUpdatedEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: scheduleEventsNames.WEEKLY_SCHEDULE_UPDATED,
  eventSchema: weeklyScheduleUpdatedEventValidation,
  handler: handleWeeklyScheduleUpdatedEvent,
};

const recommendationsGeneratedSubscriberParams: RabbitSubscriberParams<RecommendationsGeneratedEventType> = {
  thisServiceName: 'NOTIFICATIONS_SERVICE',
  eventName: searchEventsNames.RECOMMENDATIONS_GENERATED,
  eventSchema: recommendationsGeneratedEventValidation,
  handler: handleRecommendationsGeneratedEvent,
};

// Publisher

export let notificationEventPublisher: (data: NotificationEventType) => void;

const notificationEventPublisherParams: RabbitPublisherParams<NotificationEventType> = {
  eventName: notificationEventsNames.SEND_NOTIFICATION,
  eventSchema: notificationEventValidation,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    // Initialize Subscribers
    await initializeRabbitSubscriber(userCreatedSubscriberParams);
    await initializeRabbitSubscriber(bookingRequestedSubscriberParams);
    await initializeRabbitSubscriber(bookingApprovedSubscriberParams);
    await initializeRabbitSubscriber(bookingRejectedSubscriberParams);
    await initializeRabbitSubscriber(callEndedSubscriberParams);
    await initializeRabbitSubscriber(paymentFailedSubscriberParams);
    await initializeRabbitSubscriber(payoutProcessedSubscriberParams);
    await initializeRabbitSubscriber(reviewSubmittedSubscriberParams);
    await initializeRabbitSubscriber(authFailureSubscriberParams);
    await initializeRabbitSubscriber(messageSentSubscriberParams);
    await initializeRabbitSubscriber(deliveryFailedSubscriberParams);
    await initializeRabbitSubscriber(bookingCancelledSubscriberParams);
    await initializeRabbitSubscriber(callStartedSubscriberParams);
    await initializeRabbitSubscriber(newPasswordSetSubscriberParams);
    await initializeRabbitSubscriber(consultantOnboardedSubscriberParams);
    await initializeRabbitSubscriber(paymentProcessedSubscriberParams);
    await initializeRabbitSubscriber(payoutFailedSubscriberParams);
    await initializeRabbitSubscriber(topicAddedSubscriberParams);
    await initializeRabbitSubscriber(weeklyScheduleUpdatedSubscriberParams);
    await initializeRabbitSubscriber(recommendationsGeneratedSubscriberParams);

    // Initialize Publisher
    notificationEventPublisher = await rabbitPublisherFactory(notificationEventPublisherParams);
  });
};
