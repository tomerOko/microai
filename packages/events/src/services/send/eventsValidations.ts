// events/validations/send.ts
import { z } from 'zod';
import { sendEventsNames } from './eventsNames';
import { channelEnum, messageContentSchema } from './shared';

export const sendNotificationEventValidation = z.object({
  type: z.literal(sendEventsNames.SEND_NOTIFICATION),
  data: z.object({
    userID: z.string(),
    channels: z.array(channelEnum),
    content: messageContentSchema,
  }),
});

export const sendPincodeEmailEventValidation = z.object({
  type: z.literal(sendEventsNames.SEND_PINCODE_EMAIL),
  data: z.object({
    email: z.string().email(),
    pincode: z.string(),
  }),
});

export const deliverySucceededEventValidation = z.object({
  type: z.literal(sendEventsNames.DELIVERY_SUCCEEDED),
  data: z.object({
    userID: z.string().optional(),
    email: z.string().email().optional(),
    channels: z.array(channelEnum).optional(),
    content: messageContentSchema.optional(),
    timestamp: z.string(),
  }),
});

export const deliveryFailedEventValidation = z.object({
  type: z.literal(sendEventsNames.DELIVERY_FAILED),
  data: z.object({
    userID: z.string().optional(),
    email: z.string().email().optional(),
    error: z.string(),
    timestamp: z.string(),
  }),
});

export const retryScheduledEventValidation = z.object({
  type: z.literal(sendEventsNames.RETRY_SCHEDULED),
  data: z.object({
    deliveryID: z.string(),
    retryAt: z.string(),
  }),
});
