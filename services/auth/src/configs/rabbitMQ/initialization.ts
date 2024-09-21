// configs/rabbitMQ/initialization.ts
import {
  RabbitPublisherParams,
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import {
  AuthSuccessEventType,
  AuthFailureEventType,
  UserCreatedEventType,
  NewPasswordSetEventType,
  OAuthLinkedEventType,
  AuthMethodAddedEventType,
  signupEventsNames,
  authEventsNames,
  userCreatedEventValidation,
  newPasswordSetEventValidation,
  oauthLinkedEventValidation,
  authMethodAddedEventValidation,
  authSuccessEventValidation,
  authFailureEventValidation,
} from 'events-tomeroko3';

import {
  handleUserCreatedEvent,
  handleNewPasswordSetEvent,
  handleOAuthLinkedEvent,
  handleAuthMethodAddedEvent,
} from '../../logic/consumers';

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

const newPasswordSetSubscriberParams: RabbitSubscriberParams<NewPasswordSetEventType> = {
  thisServiceName: 'AUTH_SERVICE',
  eventName: signupEventsNames.NEW_PASSWORD_SET,
  eventSchema: newPasswordSetEventValidation,
  handler: handleNewPasswordSetEvent,
};

const oauthLinkedSubscriberParams: RabbitSubscriberParams<OAuthLinkedEventType> = {
  thisServiceName: 'AUTH_SERVICE',
  eventName: signupEventsNames.OAUTH_LINKED,
  eventSchema: oauthLinkedEventValidation,
  handler: handleOAuthLinkedEvent,
};

const authMethodAddedSubscriberParams: RabbitSubscriberParams<AuthMethodAddedEventType> = {
  thisServiceName: 'AUTH_SERVICE',
  eventName: signupEventsNames.AUTH_METHOD_ADDED,
  eventSchema: authMethodAddedEventValidation,
  handler: handleAuthMethodAddedEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    await initializeRabbitSubscriber(userCreatedSubscriberParams);
    await initializeRabbitSubscriber(newPasswordSetSubscriberParams);
    await initializeRabbitSubscriber(oauthLinkedSubscriberParams);
    await initializeRabbitSubscriber(authMethodAddedSubscriberParams);
    authSuccessPublisher = await rabbitPublisherFactory(authSuccessPublisherParams);
    authFailurePublisher = await rabbitPublisherFactory(authFailurePublisherParams);
  });
};
