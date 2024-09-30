// configs/rabbitMQ/initialization.ts
import {
  RabbitPublisherParams,
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import {
  ConsultantOnboardedEventType,
  ConsultantProfileUpdatedEventType,
  TopicAddedEventType,
  TopicUpdatedEventType,
  TopicRemovedEventType,
  AvailabilityUpdatedEventType,
  AvailabilityBlockFullEventType,
  AvailabilityBlockAvailableEventType,
  AvailableNowStatusChangedEventType,
  RatingUpdatedEventType,
  RecommendationsGeneratedEventType,
  consultantEventsNames,
  availabilitiesEventsNames,
  ratingEventsNames,
  searchEventsNames,
  consultantOnboardedEventValidation,
  consultantProfileUpdatedEventValidation,
  topicAddedEventValidation,
  topicUpdatedEventValidation,
  topicRemovedEventValidation,
  availabilityUpdatedEventValidation,
  availabilityBlockFullEventValidation,
  availabilityBlockAvailableEventValidation,
  availableNowStatusChangedEventValidation,
  ratingUpdatedEventValidation,
  recommendationsGeneratedEventValidation,
} from 'events-tomeroko3';

import {
  handleConsultantOnboardedEvent,
  handleConsultantProfileUpdatedEvent,
  handleTopicAddedEvent,
  handleTopicUpdatedEvent,
  handleTopicRemovedEvent,
  handleAvailabilityUpdatedEvent,
  handleAvailabilityBlockFullEvent,
  handleAvailabilityBlockAvailableEvent,
  handleAvailableNowStatusChangedEvent,
  handleRatingUpdatedEvent,
} from '../../logic/consumers';

export let recommendationsGeneratedPublisher: (
  data: RecommendationsGeneratedEventType['data'],
) => void;

const recommendationsGeneratedPublisherParams: RabbitPublisherParams<RecommendationsGeneratedEventType> =
  {
    eventName: searchEventsNames.RECOMMENDATIONS_GENERATED,
    eventSchema: recommendationsGeneratedEventValidation,
  };

const consultantOnboardedSubscriberParams: RabbitSubscriberParams<ConsultantOnboardedEventType> = {
  thisServiceName: 'SEARCH_SERVICE',
  eventName: consultantEventsNames.CONSULTANT_ONBOARDED,
  eventSchema: consultantOnboardedEventValidation,
  handler: handleConsultantOnboardedEvent,
};

const consultantProfileUpdatedSubscriberParams: RabbitSubscriberParams<ConsultantProfileUpdatedEventType> =
  {
    thisServiceName: 'SEARCH_SERVICE',
    eventName: consultantEventsNames.CONSULTANT_PROFILE_UPDATED,
    eventSchema: consultantProfileUpdatedEventValidation,
    handler: handleConsultantProfileUpdatedEvent,
  };

const topicAddedSubscriberParams: RabbitSubscriberParams<TopicAddedEventType> = {
  thisServiceName: 'SEARCH_SERVICE',
  eventName: consultantEventsNames.TOPIC_ADDED,
  eventSchema: topicAddedEventValidation,
  handler: handleTopicAddedEvent,
};

const topicUpdatedSubscriberParams: RabbitSubscriberParams<TopicUpdatedEventType> = {
  thisServiceName: 'SEARCH_SERVICE',
  eventName: consultantEventsNames.TOPIC_UPDATED,
  eventSchema: topicUpdatedEventValidation,
  handler: handleTopicUpdatedEvent,
};

const topicRemovedSubscriberParams: RabbitSubscriberParams<TopicRemovedEventType> = {
  thisServiceName: 'SEARCH_SERVICE',
  eventName: consultantEventsNames.TOPIC_REMOVED,
  eventSchema: topicRemovedEventValidation,
  handler: handleTopicRemovedEvent,
};

const availabilityUpdatedSubscriberParams: RabbitSubscriberParams<AvailabilityUpdatedEventType> = {
  thisServiceName: 'SEARCH_SERVICE',
  eventName: availabilitiesEventsNames.AVAILABILITY_UPDATED,
  eventSchema: availabilityUpdatedEventValidation,
  handler: handleAvailabilityUpdatedEvent,
};

const availabilityBlockFullSubscriberParams: RabbitSubscriberParams<AvailabilityBlockFullEventType> =
  {
    thisServiceName: 'SEARCH_SERVICE',
    eventName: availabilitiesEventsNames.AVAILABILITY_BLOCK_FULL,
    eventSchema: availabilityBlockFullEventValidation,
    handler: handleAvailabilityBlockFullEvent,
  };

const availabilityBlockAvailableSubscriberParams: RabbitSubscriberParams<AvailabilityBlockAvailableEventType> =
  {
    thisServiceName: 'SEARCH_SERVICE',
    eventName: availabilitiesEventsNames.AVAILABILITY_BLOCK_AVAILABLE,
    eventSchema: availabilityBlockAvailableEventValidation,
    handler: handleAvailabilityBlockAvailableEvent,
  };

const availableNowStatusChangedSubscriberParams: RabbitSubscriberParams<AvailableNowStatusChangedEventType> =
  {
    thisServiceName: 'SEARCH_SERVICE',
    eventName: availabilitiesEventsNames.AVAILABLE_NOW_STATUS_CHANGED,
    eventSchema: availableNowStatusChangedEventValidation,
    handler: handleAvailableNowStatusChangedEvent,
  };

const ratingUpdatedSubscriberParams: RabbitSubscriberParams<RatingUpdatedEventType> = {
  thisServiceName: 'SEARCH_SERVICE',
  eventName: ratingEventsNames.RATING_UPDATED,
  eventSchema: ratingUpdatedEventValidation,
  handler: handleRatingUpdatedEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    await initializeRabbitSubscriber(consultantOnboardedSubscriberParams);
    await initializeRabbitSubscriber(consultantProfileUpdatedSubscriberParams);
    await initializeRabbitSubscriber(topicAddedSubscriberParams);
    await initializeRabbitSubscriber(topicUpdatedSubscriberParams);
    await initializeRabbitSubscriber(topicRemovedSubscriberParams);
    await initializeRabbitSubscriber(availabilityUpdatedSubscriberParams);
    await initializeRabbitSubscriber(availabilityBlockFullSubscriberParams);
    await initializeRabbitSubscriber(availabilityBlockAvailableSubscriberParams);
    await initializeRabbitSubscriber(availableNowStatusChangedSubscriberParams);
    await initializeRabbitSubscriber(ratingUpdatedSubscriberParams);
    recommendationsGeneratedPublisher = await rabbitPublisherFactory(
      recommendationsGeneratedPublisherParams,
    );
  });
};
