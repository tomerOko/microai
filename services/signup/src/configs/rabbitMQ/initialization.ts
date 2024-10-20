// initialization.ts
import { RabbitPublisherParams, functionWrapper, rabbitPublisherFactory } from 'common-lib-tomeroko3';
import {
  AuthMethodAddedEventType,
  NewPasswordSetEventType,
  OAuthLinkedEventType,
  SendNotificationEventType,
  UserCreatedEventType,
  UserUpdatedEventType,
  authMethodAddedEventValidation,
  newPasswordSetEventValidation,
  oauthLinkedEventValidation,
  sendNotificationEventValidation,
  signupEventsNames,
  userCreatedEventValidation,
  userUpdatedEventValidation,
} from 'events-tomeroko3';

export let userCreatedPublisher: (data: UserCreatedEventType['data']) => void;
export let userUpdatedPublisher: (data: UserUpdatedEventType['data']) => void;
export let userDeactivatedPublisher: (data: UserDeactivatedEventType['data']) => void;
export let newPasswordSetPublisher: (data: NewPasswordSetEventType['data']) => void;
export let oauthLinkedPublisher: (data: OAuthLinkedEventType['data']) => void;
export let authMethodAddedPublisher: (data: AuthMethodAddedEventType['data']) => void;
export let sendNotificationPublisher: (data: SendNotificationEventType['data']) => void;

const userCreatedPublisherParams: RabbitPublisherParams<UserCreatedEventType> = {
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
};

const userUpdatedPublisherParams: RabbitPublisherParams<UserUpdatedEventType> = {
  eventName: signupEventsNames.USER_UPDATED,
  eventSchema: userUpdatedEventValidation,
};

const userDeactivatedPublisherParams: RabbitPublisherParams<UserDeactivatedEventType> = {
  eventName: signupEventsNames.USER_DEACTIVATED,
  eventSchema: userDeactivatedEventValidation,
};

const newPasswordSetPublisherParams: RabbitPublisherParams<NewPasswordSetEventType> = {
  eventName: signupEventsNames.NEW_PASSWORD_SET,
  eventSchema: newPasswordSetEventValidation,
};

const oauthLinkedPublisherParams: RabbitPublisherParams<OAuthLinkedEventType> = {
  eventName: signupEventsNames.OAUTH_LINKED,
  eventSchema: oauthLinkedEventValidation,
};

const authMethodAddedPublisherParams: RabbitPublisherParams<AuthMethodAddedEventType> = {
  eventName: signupEventsNames.AUTH_METHOD_ADDED,
  eventSchema: authMethodAddedEventValidation,
};

const sendNotificationPublisherParams: RabbitPublisherParams<SendNotificationEventType> = {
  eventName: signupEventsNames.SEND_NOTIFICATION,
  eventSchema: sendNotificationEventValidation,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    userCreatedPublisher = await rabbitPublisherFactory(userCreatedPublisherParams);
    userUpdatedPublisher = await rabbitPublisherFactory(userUpdatedPublisherParams);
    userDeactivatedPublisher = await rabbitPublisherFactory(userDeactivatedPublisherParams);
    newPasswordSetPublisher = await rabbitPublisherFactory(newPasswordSetPublisherParams);
    oauthLinkedPublisher = await rabbitPublisherFactory(oauthLinkedPublisherParams);
    authMethodAddedPublisher = await rabbitPublisherFactory(authMethodAddedPublisherParams);
    sendNotificationPublisher = await rabbitPublisherFactory(sendNotificationPublisherParams);
  });
};
