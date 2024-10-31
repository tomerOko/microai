// configs/rabbitMQ/initialization.ts
import {
  RabbitPublisherParams,
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import {
  AuthFailureEventType,
  AuthSuccessEventType,
  UserCreatedEventType,
  UserUpdatedEventType,
  authEventsNames,
  authFailureEventValidation,
  authSuccessEventValidation,
  signupEventsNames,
  userCreatedEventValidation,
  userUpdatedEventValidation,
} from 'events-tomeroko3';

import { handleUserCreatedEvent, handleUserUpdatedEvent } from '../../logic/consumers';

export let authSuccessPublisher: (data: AuthSuccessEventType['data']) => void;
export let authFailurePublisher: (data: AuthFailureEventType['data']) => void;

const authSuccessPublisherParams: RabbitPublisherParams<AuthSuccessEventType> = {
  eventName: authEventsNames.AUTH_SUCCESS,
  eventSchema: authSuccessEventValidation,
};

const authFailurePublisherParams: RabbitPublisherParams<AuthFailureEventType> = {
  eventName: authEventsNames.AUTH_FAILURE,
  eventSchema: authFailureEventValidation,
};

const userCreatedSubscriberParams: RabbitSubscriberParams<UserCreatedEventType> = {
  thisServiceName: 'AUTH_SERVICE',
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
  handler: handleUserCreatedEvent,
};

const userUpdatedSubscriberParams: RabbitSubscriberParams<UserUpdatedEventType> = {
  thisServiceName: 'AUTH_SERVICE',
  eventName: signupEventsNames.USER_UPDATED,
  eventSchema: userUpdatedEventValidation,
  handler: handleUserUpdatedEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    await initializeRabbitSubscriber(userCreatedSubscriberParams);
    await initializeRabbitSubscriber(userUpdatedSubscriberParams);
    authSuccessPublisher = await rabbitPublisherFactory(authSuccessPublisherParams);
    authFailurePublisher = await rabbitPublisherFactory(authFailurePublisherParams);
  });
};
