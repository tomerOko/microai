// validations/sockets.ts
import * as z from 'zod';
import { SocketsEventsNames } from '../names';

export const messageDeliveredEventValidation = z.object({
  type: z.literal(SocketsEventsNames.MESSAGE_DELIVERED),
  data: z.object({
    messageID: z.string(),
  }),
});

export const userOnlineEventValidation = z.object({
  type: z.literal(SocketsEventsNames.USER_ONLINE),
  data: z.object({
    userID: z.string(),
  }),
});

export const userOfflineEventValidation = z.object({
  type: z.literal(SocketsEventsNames.USER_OFFLINE),
  data: z.object({
    userID: z.string(),
  }),
});

export const socketMessageEventValidation = z.object({
  type: z.literal(SocketsEventsNames.SOCKET_MESSAGE),
  data: z.object({
    messageID: z.string(),
    targetUserIDs: z.array(z.string()),
    message: z.any(),
  }),
});

export const messageSentEventValidation = z.object({
  type: z.literal('MESSAGE_SENT'),
  data: z.object({
    messageID: z.string(),
    targetUserIDs: z.array(z.string()),
    message: z.any(),
  }),
});

export const notificationDispatchedEventValidation = z.object({
  type: z.literal('NOTIFICATION_DISPATCHED'),
  data: z.object({
    notificationID: z.string(),
    targetUserIDs: z.array(z.string()),
    notification: z.any(),
  }),
});

export const userCreatedEventValidation = z.object({
  type: z.literal('USER_CREATED'),
  data: z.object({
    ID: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
  }),
});

export const userUpdatedEventValidation = z.object({
  type: z.literal('USER_UPDATED'),
  data: z.object({
    userID: z.string(),
    update: z.object({
      email: z.string().email().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    }),
  }),
});
