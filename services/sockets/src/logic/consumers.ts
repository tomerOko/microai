// consumers.ts
import {
  MessageSentEventType,
  NotificationDispatchedEventType,
  SocketMessageEventType,
  UserCreatedEventType,
  UserUpdatedEventType,
} from 'events-tomeroko3';

import * as service from './service';
import { usersCollection } from '../configs/mongoDB/initialization';

export const handleUserCreatedEvent = async (event: UserCreatedEventType['data']) => {
  await usersCollection.insertOne({ ...event, status: 'offline' });
};

export const handleUserUpdatedEvent = async (event: UserUpdatedEventType['data']) => {
  const { userID, update } = event;
  await usersCollection.updateOne({ ID: userID }, { $set: update });
};

export const handleSocketMessageEvent = async (event: SocketMessageEventType['data']) => {
  await service.deliverMessageToClients(event.targetUserIDs, event.message);
  service.messageDeliveredPublisher({ messageID: event.messageID });
};

export const handleMessageSentEvent = async (event: MessageSentEventType['data']) => {
  await service.deliverMessageToClients(event.targetUserIDs, event.message);
  service.messageDeliveredPublisher({ messageID: event.messageID });
};

export const handleNotificationDispatchedEvent = async (event: NotificationDispatchedEventType['data']) => {
  await service.deliverNotificationToClients(event.targetUserIDs, event.notification);
  service.notificationDeliveredPublisher({ notificationID: event.notificationID });
};
