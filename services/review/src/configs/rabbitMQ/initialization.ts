// configs/rabbitMQ/initialization.ts
import {
  RabbitPublisherParams,
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import {
  ReviewSubmittedEventType,
  LongTermReviewSubmittedEventType,
  RatingUpdatedEventType,
  CallEndedEventType,
  UserCreatedEventType,
  UserUpdatedEventType,
  ratingEventsNames,
  callEventsNames,
  signupEventsNames,
  reviewSubmittedEventValidation,
  longTermReviewSubmittedEventValidation,
  ratingUpdatedEventValidation,
  callEndedEventValidation,
  userCreatedEventValidation,
  userUpdatedEventValidation,
} from 'events-tomeroko3';

import {
  handleCallEndedEvent,
  handleUserCreatedEvent,
  handleUserUpdatedEvent,
} from '../../logic/consumers';

export let reviewSubmittedPublisher: (review: ReviewSubmittedEventType['data']) => void;
export let longTermReviewSubmittedPublisher: (review: LongTermReviewSubmittedEventType['data']) => void;
export let ratingUpdatedPublisher: (rating: RatingUpdatedEventType['data']) => void;

const reviewSubmittedPublisherParams: RabbitPublisherParams<ReviewSubmittedEventType> = {
  eventName: ratingEventsNames.REVIEW_SUBMITTED,
  eventSchema: reviewSubmittedEventValidation,
};

const longTermReviewSubmittedPublisherParams: RabbitPublisherParams<LongTermReviewSubmittedEventType> = {
  eventName: ratingEventsNames.LONG_TERM_REVIEW_SUBMITTED,
  eventSchema: longTermReviewSubmittedEventValidation,
};

const ratingUpdatedPublisherParams: RabbitPublisherParams<RatingUpdatedEventType> = {
  eventName: ratingEventsNames.RATING_UPDATED,
  eventSchema: ratingUpdatedEventValidation,
};

const callEndedSubscriberParams: RabbitSubscriberParams<CallEndedEventType> = {
  thisServiceName: 'RATING_SERVICE',
  eventName: callEventsNames.CALL_ENDED,
  eventSchema: callEndedEventValidation,
  handler: handleCallEndedEvent,
};

const userCreatedSubscriberParams: RabbitSubscriberParams<UserCreatedEventType> = {
  thisServiceName: 'RATING_SERVICE',
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
  handler: handleUserCreatedEvent,
};

const userUpdatedSubscriberParams: RabbitSubscriberParams<UserUpdatedEventType> = {
  thisServiceName: 'RATING_SERVICE',
  eventName: signupEventsNames.USER_UPDATED,
  eventSchema: userUpdatedEventValidation,
  handler: handleUserUpdatedEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    // Initialize Subscribers
    await initializeRabbitSubscriber(callEndedSubscriberParams);
    await initializeRabbitSubscriber(userCreatedSubscriberParams);
    await initializeRabbitSubscriber(userUpdatedSubscriberParams);

    // Initialize Publishers
    reviewSubmittedPublisher = await rabbitPublisherFactory(reviewSubmittedPublisherParams);
    longTermReviewSubmittedPublisher = await rabbitPublisherFactory(longTermReviewSubmittedPublisherParams);
    ratingUpdatedPublisher = await rabbitPublisherFactory(ratingUpdatedPublisherParams);
  });
};
