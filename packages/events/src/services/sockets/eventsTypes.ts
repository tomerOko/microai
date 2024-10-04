// types/sockets.ts
import * as z from 'zod';
import {
  messageDeliveredEventValidation,
  notificationDispatchedEventValidation,
  socketMessageEventValidation,
  userCreatedEventValidation,
  userOfflineEventValidation,
  userOnlineEventValidation,
  userUpdatedEventValidation,
} from '../validations/sockets';

export type MessageDeliveredEventType = z.infer<typeof messageDeliveredEventValidation>;
export type UserOnlineEventType = z.infer<typeof userOnlineEventValidation>;
export type UserOfflineEventType = z.infer<typeof userOfflineEventValidation>;
export type SocketMessageEventType = z.infer<typeof socketMessageEventValidation>;
export type NotificationDispatchedEventType = z.infer<typeof notificationDispatchedEventValidation>;
export type UserCreatedEventType = z.infer<typeof userCreatedEventValidation>;
export type UserUpdatedEventType = z.infer<typeof userUpdatedEventValidation>;
