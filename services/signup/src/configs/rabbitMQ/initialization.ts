// initialization.ts
import {
  RabbitPublisherParams,
  functionWrapper,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import {
  UserCreatedEventType,
  SendPincodeEmailEventType,
  NewPasswordSetEventType,
  OAuthLinkedEventType,
  AuthMethodAddedEventType,
  signupEventsNames,
  userCreatedEventValidation,
  sendPincodeEmailEventValidation,
  newPasswordSetEventValidation,
  oauthLinkedEventValidation,
  authMethodAddedEventValidation,
} from 'events-tomeroko3';

// Publishers
export let sendPincodeEmailPublisher: (data: SendPincodeEmailEventType['data']) => void;
export let userCreatedPublisher: (data: UserCreatedEventType['data']) => void;
export let newPasswordSetPublisher: (data: NewPasswordSetEventType['data']) => void;
export let oauthLinkedPublisher: (data: OAuthLinkedEventType['data']) => void;
export let authMethodAddedPublisher: (data: AuthMethodAddedEventType['data']) => void;

const sendPincodeEmailPublisherParams: RabbitPublisherParams<SendPincodeEmailEventType> = {
  eventName: signupEventsNames.SEND_PINCODE_EMAIL,
  eventSchema: sendPincodeEmailEventValidation,
};

const userCreatedPublisherParams: RabbitPublisherParams<UserCreatedEventType> = {
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
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

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    sendPincodeEmailPublisher = await rabbitPublisherFactory(sendPincodeEmailPublisherParams);
    userCreatedPublisher = await rabbitPublisherFactory(userCreatedPublisherParams);
    newPasswordSetPublisher = await rabbitPublisherFactory(newPasswordSetPublisherParams);
    oauthLinkedPublisher = await rabbitPublisherFactory(oauthLinkedPublisherParams);
    authMethodAddedPublisher = await rabbitPublisherFactory(authMethodAddedPublisherParams);
  });
};
