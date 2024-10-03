// events/notificationEventsValidations.ts

import { z } from 'zod';
import { notificationEventsNames } from './notificationEventsNames';

// Notification Event Validation Schema
export const notificationEventValidation = z.object({
  eventName: z.literal(notificationEventsNames.SEND_NOTIFICATION),
  data: z.object({
    userID: z.string(),
    address: z.string(),
    content: z.string(),
    communicationType: z.enum(['email', 'sms', 'whatsapp', 'inApp']),
  }),
});

// Delivery Succeeded Event Validation Schema
export const deliverySucceededEventValidation = z.object({
  eventName: z.literal(notificationEventsNames.DELIVERY_SUCCEEDED),
  data: z.object({
    userID: z.string(),
    notificationID: z.string(),
  }),
});

// Delivery Failed Event Validation Schema
export const deliveryFailedEventValidation = z.object({
  eventName: z.literal(notificationEventsNames.DELIVERY_FAILED),
  data: z.object({
    userID: z.string(),
    notificationID: z.string(),
    reason: z.string().optional(),
  }),
});
