// RabbitMQ Initialization (initialization.ts)
import {
  RabbitPublisherParams,
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import {
  DeliveryFailedEventType,
  DeliverySucceededEventType,
  RetryScheduledEventType,
  SendNotificationEventType,
  SendNotificationFundumentalEventType,
  UserCreatedEventType,
  UserUpdatedEventType,
  deliveryFailedEventValidation,
  deliverySucceededEventValidation,
  retryScheduledEventValidation,
  sendEventsNames,
  sendNotificationEventValidation,
  sendNotificationFundumentalEventValidation,
  signupEventsNames,
  userCreatedEventValidation,
  userUpdatedEventValidation,
} from 'events-tomeroko3';

import {
  handleSendNotificationEvent,
  handleSendNotificationFundeEvent,
  handleUserCreatedEvent,
  handleUserUpdatedEvent,
} from '../../logic/consumers';

export let deliverySucceededPublisher: (data: DeliverySucceededEventType['data']) => void;
export let deliveryFailedPublisher: (data: DeliveryFailedEventType['data']) => void;
export let retryScheduledPublisher: (data: RetryScheduledEventType['data']) => void;

const sendNotificationSubscriberParams: RabbitSubscriberParams<SendNotificationEventType> = {
  thisServiceName: 'SEND_SERVICE',
  eventName: sendEventsNames.SEND_NOTIFICATION,
  eventSchema: sendNotificationEventValidation,
  handler: handleSendNotificationEvent,
};

const sendNotificationFundamentalSubscriberParams: RabbitSubscriberParams<SendNotificationFundumentalEventType> = {
  thisServiceName: 'SEND_SERVICE',
  eventName: sendEventsNames.SEND_NOTIFICATION_FUNDUMENTAL,
  eventSchema: sendNotificationFundumentalEventValidation,
  handler: handleSendNotificationFundeEvent,
};

const userCreatedSubscriberParams: RabbitSubscriberParams<UserCreatedEventType> = {
  thisServiceName: 'SEND_SERVICE',
  eventName: signupEventsNames.USER_CREATED,
  eventSchema: userCreatedEventValidation,
  handler: handleUserCreatedEvent,
};

const userUpdatedSubscriberParams: RabbitSubscriberParams<UserUpdatedEventType> = {
  thisServiceName: 'SEND_SERVICE',
  eventName: signupEventsNames.USER_UPDATED,
  eventSchema: userUpdatedEventValidation,
  handler: handleUserUpdatedEvent,
};

const deliverySucceededPublisherParams: RabbitPublisherParams<DeliverySucceededEventType> = {
  eventName: sendEventsNames.DELIVERY_SUCCEEDED,
  eventSchema: deliverySucceededEventValidation,
};

const deliveryFailedPublisherParams: RabbitPublisherParams<DeliveryFailedEventType> = {
  eventName: sendEventsNames.DELIVERY_FAILED,
  eventSchema: deliveryFailedEventValidation,
};

const retryScheduledPublisherParams: RabbitPublisherParams<RetryScheduledEventType> = {
  eventName: sendEventsNames.RETRY_SCHEDULED,
  eventSchema: retryScheduledEventValidation,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    await initializeRabbitSubscriber(sendNotificationSubscriberParams);
    await initializeRabbitSubscriber(sendNotificationFundamentalSubscriberParams);
    await initializeRabbitSubscriber(userCreatedSubscriberParams);
    await initializeRabbitSubscriber(userUpdatedSubscriberParams);

    deliverySucceededPublisher = await rabbitPublisherFactory(deliverySucceededPublisherParams);
    deliveryFailedPublisher = await rabbitPublisherFactory(deliveryFailedPublisherParams);
    retryScheduledPublisher = await rabbitPublisherFactory(retryScheduledPublisherParams);
  });
};
