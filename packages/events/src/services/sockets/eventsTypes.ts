// types/sockets.ts
import * as z from 'zod';
import {
  messageDeliveredEventValidation,
  notificationDispatchedEventValidation,
  socketMessageEventValidation,
  userOfflineEventValidation,
  userOnlineEventValidation,
  userUpdatedEventValidation,
} from './eventsValidations';

export type MessageDeliveredEventType = z.infer<typeof messageDeliveredEventValidation>;
export type UserOnlineEventType = z.infer<typeof userOnlineEventValidation>;
export type UserOfflineEventType = z.infer<typeof userOfflineEventValidation>;
export type SocketMessageEventType = z.infer<typeof socketMessageEventValidation>;
export type NotificationDispatchedEventType = z.infer<typeof notificationDispatchedEventValidation>;
export type UserUpdatedEventType = z.infer<typeof userUpdatedEventValidation>;
