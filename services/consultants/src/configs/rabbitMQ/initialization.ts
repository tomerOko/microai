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
  UserCreatedEventType,
  signupEventsNames,
  consultantEventsNames,
  consultantOnboardedEventValidation,
  consultantProfileUpdatedEventValidation,
  topicAddedEventValidation,
  topicUpdatedEventValidation,
  topicRemovedEventValidation,
  userCreatedEventValidation,
} from 'events-tomeroko3';

import { handleUserCreatedEvent } from '../../logic/consumers';

export let consultantOnboardedPublisher: (data: ConsultantOnboardedEventType['data']) => void;
export let consultantProfileUpdatedPublisher: (data: ConsultantProfileUpdatedEventType['data']) => void;
export let topicAddedPublisher: (data: TopicAddedEventType['data']) => void;
export let topicUpdatedPublisher: (data: TopicUpdatedEventType['data']) => void;
export let topicRemovedPublisher: (data: TopicRemovedEventType['data']) => void;

const consultantOnboardedPublisherParams: RabbitPublisherParams<ConsultantOnboardedEventType> = {
  eventName: consultantEventsNames.CONSULTANT_ONBOARDED,
  eventSchema: consultantOnboardedEventValidation,
};

const consultantProfileUpdatedPublisherParams: RabbitPublisherParams<ConsultantProfileUpdatedEventType> = {
  eventName: consultantEventsNames.CONSULTANT_PROFILE_UPDATED,
  eventSchema: consultantProfileUpdatedEventValidation,
};

const topicAddedPublisherParams: RabbitPublisherParams<TopicAddedEventType> = {
  eventName: consultantEventsNames.TOPIC_ADDED,
  eventSchema: topicAddedEventValidation,
};

const topicUpdatedPublisherParams: RabbitPublisherParams<TopicUpdatedEventType> = {
  eventName: consultantEventsNames.TOPIC_UPDATED,
  eventSchema: topicUpdatedEventValidation,
};

const topicRemovedPublisherParams: RabbitPublisherParams<TopicRemovedEventType> = {
  eventName: consultantEventsNames.TOPIC_REMOVED,
  eventSchema: topicRemovedEventValidation,
};

const userSubscriberParams: RabbitSubscriberParams<UserCreatedEventType> = {
  thisServiceName: 'CONSULTANT_SERVICE',
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
  handler: handleUserCreatedEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    await initializeRabbitSubscriber(userSubscriberParams);
    consultantOnboardedPublisher = await rabbitPublisherFactory(consultantOnboardedPublisherParams);
    consultantProfileUpdatedPublisher = await rabbitPublisherFactory(
      consultantProfileUpdatedPublisherParams,
    );
    topicAddedPublisher = await rabbitPublisherFactory(topicAddedPublisherParams);
    topicUpdatedPublisher = await rabbitPublisherFactory(topicUpdatedPublisherParams);
    topicRemovedPublisher = await rabbitPublisherFactory(topicRemovedPublisherParams);
  });
};
