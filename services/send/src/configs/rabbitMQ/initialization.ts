// RabbitMQ Initialization (initialization.ts)
import {
  RabbitPublisherParams,
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import {
  SendNotificationEventType,
  SendPincodeEmailEventType,
  DeliverySucceededEventType,
  DeliveryFailedEventType,
  RetryScheduledEventType,
  UserCreatedEventType,
  UserUpdatedEventType,
  sendEventsNames,
  signupEventsNames,
  sendNotificationEventValidation,
  sendPincodeEmailEventValidation,
  deliverySucceededEventValidation,
  deliveryFailedEventValidation,
  retryScheduledEventValidation,
  userCreatedEventValidation,
  userUpdatedEventValidation,
} from 'events-tomeroko3';

import {
  handleSendNotificationEvent,
  handleSendPincodeEmailEvent,
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

const sendPincodeEmailSubscriberParams: RabbitSubscriberParams<SendPincodeEmailEventType> = {
  thisServiceName: 'SEND_SERVICE',
  eventName: sendEventsNames.SEND_PINCODE_EMAIL,
  eventSchema: sendPincodeEmailEventValidation,
  handler: handleSendPincodeEmailEvent,
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
    await initializeRabbitSubscriber(sendPincodeEmailSubscriberParams);
    await initializeRabbitSubscriber(userCreatedSubscriberParams);
    await initializeRabbitSubscriber(userUpdatedSubscriberParams);

    deliverySucceededPublisher = await rabbitPublisherFactory(deliverySucceededPublisherParams);
    deliveryFailedPublisher = await rabbitPublisherFactory(deliveryFailedPublisherParams);
    retryScheduledPublisher = await rabbitPublisherFactory(retryScheduledPublisherParams);
  });
};
