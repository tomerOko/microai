// configs/rabbitMQ/initialization.ts
import {
  RabbitPublisherParams,
  RabbitSubscriberParams,
  functionWrapper,
  initializeRabbitSubscriber,
  rabbitPublisherFactory,
} from 'common-lib-tomeroko3';
import {
  MessageDeliveredEventType,
  NotificationDispatchedEventType,
  SocketsEventsNames,
  SocketMessageEventType,
  UserCreatedEventType,
  UserOfflineEventType,
  UserOnlineEventType,
  UserUpdatedEventType,
  messageDeliveredEventValidation,
  notificationDispatchedEventValidation,
  socketMessageEventValidation,
  userCreatedEventValidation,
  userOfflineEventValidation,
  userOnlineEventValidation,
  userUpdatedEventValidation,
} from 'events-tomeroko3';

import {
  handleMessageSentEvent,
  handleNotificationDispatchedEvent,
  handleSocketMessageEvent,
  handleUserCreatedEvent,
  handleUserUpdatedEvent,
} from '../../logic/consumers';

export let messageDeliveredPublisher: (data: MessageDeliveredEventType['data']) => void;
export let userOnlinePublisher: (data: UserOnlineEventType['data']) => void;
export let userOfflinePublisher: (data: UserOfflineEventType['data']) => void;
export let notificationDeliveredPublisher: (data: NotificationDispatchedEventType['data']) => void;

const messageDeliveredPublisherParams: RabbitPublisherParams<MessageDeliveredEventType> = {
  eventName: SocketsEventsNames.MESSAGE_DELIVERED,
  eventSchema: messageDeliveredEventValidation,
};

const userOnlinePublisherParams: RabbitPublisherParams<UserOnlineEventType> = {
  eventName: SocketsEventsNames.USER_ONLINE,
  eventSchema: userOnlineEventValidation,
};

const userOfflinePublisherParams: RabbitPublisherParams<UserOfflineEventType> = {
  eventName: SocketsEventsNames.USER_OFFLINE,
  eventSchema: userOfflineEventValidation,
};

const notificationDeliveredPublisherParams: RabbitPublisherParams<NotificationDispatchedEventType> = {
  eventName: 'NOTIFICATION_DELIVERED',
  eventSchema: notificationDispatchedEventValidation,
};

const socketMessageSubscriberParams: RabbitSubscriberParams<SocketMessageEventType> = {
  thisServiceName: 'SOCKETS_SERVICE',
  eventName: SocketsEventsNames.SOCKET_MESSAGE,
  eventSchema: socketMessageEventValidation,
  handler: handleSocketMessageEvent,
};

const messageSentSubscriberParams: RabbitSubscriberParams<MessageSentEventType> = {
  thisServiceName: 'SOCKETS_SERVICE',
  eventName: 'MESSAGE_SENT',
  eventSchema: messageDeliveredEventValidation,
  handler: handleMessageSentEvent,
};

const notificationDispatchedSubscriberParams: RabbitSubscriberParams<NotificationDispatchedEventType> = {
  thisServiceName: 'SOCKETS_SERVICE',
  eventName: 'NOTIFICATION_DISPATCHED',
  eventSchema: notificationDispatchedEventValidation,
  handler: handleNotificationDispatchedEvent,
};

const userCreatedSubscriberParams: RabbitSubscriberParams<UserCreatedEventType> = {
  thisServiceName: 'SOCKETS_SERVICE',
  eventName: 'USER_CREATED',
  eventSchema: userCreatedEventValidation,
  handler: handleUserCreatedEvent,
};

const userUpdatedSubscriberParams: RabbitSubscriberParams<UserUpdatedEventType> = {
  thisServiceName: 'SOCKETS_SERVICE',
  eventName: 'USER_UPDATED',
  eventSchema: userUpdatedEventValidation,
  handler: handleUserUpdatedEvent,
};

export const initializeRabbitAgents = async () => {
  return functionWrapper(async () => {
    messageDeliveredPublisher = await rabbitPublisherFactory(messageDeliveredPublisherParams);
    userOnlinePublisher = await rabbitPublisherFactory(userOnlinePublisherParams);
    userOfflinePublisher = await rabbitPublisherFactory(userOfflinePublisherParams);
    notificationDeliveredPublisher = await rabbitPublisherFactory(notificationDeliveredPublisherParams);

    await initializeRabbitSubscriber(socketMessageSubscriberParams);
    await initializeRabbitSubscriber(messageSentSubscriberParams);
    await initializeRabbitSubscriber(notificationDispatchedSubscriberParams);
    await initializeRabbitSubscriber(userCreatedSubscriberParams);
    await initializeRabbitSubscriber(userUpdatedSubscriberParams);
  });
};
