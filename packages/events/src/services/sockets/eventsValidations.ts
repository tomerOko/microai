// validations/sockets.ts
import * as z from 'zod';
import { socketsEventsNames } from './eventsNames';

export const messageDeliveredEventValidation = z.object({
  type: z.literal(socketsEventsNames.MESSAGE_DELIVERED),
  data: z.object({
    messageID: z.string(),
  }),
});

export const userOnlineEventValidation = z.object({
  type: z.literal(socketsEventsNames.USER_ONLINE),
  data: z.object({
    userID: z.string(),
  }),
});

export const userOfflineEventValidation = z.object({
  type: z.literal(socketsEventsNames.USER_OFFLINE),
  data: z.object({
    userID: z.string(),
  }),
});

export const socketMessageEventValidation = z.object({
  type: z.literal(socketsEventsNames.SOCKET_MESSAGE),
  data: z.object({
    messageID: z.string(),
    targetUserIDs: z.array(z.string()),
    message: z.any(),
  }),
});

export const sokcetMessageSentEventValidation = z.object({
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
