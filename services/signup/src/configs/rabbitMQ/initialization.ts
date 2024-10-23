// initialization.ts
import { RabbitPublisherParams, functionWrapper, rabbitPublisherFactory } from 'common-lib-tomeroko3';
import {
  NewPasswordSetEventType,
  SendNotificationEventType,
  SendNotificationFundumentalEventType,
  UserCreatedEventType,
  UserDeactivatedEventType,
  UserUpdatedEventType,
  newPasswordSetEventValidation,
  sendEventsNames,
  sendNotificationEventValidation,
  sendNotificationFundumentalEventValidation,
  signupEventsNames,
  userCreatedEventValidation,
  userDeactivatedEventValidation,
  userUpdatedEventValidation,
} from 'events-tomeroko3';

export let userCreatedPublisher: (data: UserCreatedEventType['data']) => void;
export let userUpdatedPublisher: (data: UserUpdatedEventType['data']) => void;
export let userDeactivatedPublisher: (data: UserDeactivatedEventType['data']) => void;
export let newPasswordSetPublisher: (data: NewPasswordSetEventType['data']) => void;
export let sendNotificationFundumentalPublisher: (data: SendNotificationFundumentalEventType['data']) => void;

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

const sendNotificationFundumnetalPublisherParams: RabbitPublisherParams<SendNotificationFundumentalEventType> = {
  eventName: sendEventsNames.SEND_NOTIFICATION_FUNDUMENTAL,
  eventSchema: sendNotificationFundumentalEventValidation,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    userCreatedPublisher = await rabbitPublisherFactory(userCreatedPublisherParams);
    userUpdatedPublisher = await rabbitPublisherFactory(userUpdatedPublisherParams);
    userDeactivatedPublisher = await rabbitPublisherFactory(userDeactivatedPublisherParams);
    newPasswordSetPublisher = await rabbitPublisherFactory(newPasswordSetPublisherParams);
    sendNotificationFundumentalPublisher = await rabbitPublisherFactory(sendNotificationFundumnetalPublisherParams);
  });
};
