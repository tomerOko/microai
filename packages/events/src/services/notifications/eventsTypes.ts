// events/notificationEventsTypes.ts

import { z } from 'zod';
import {
  notificationEventValidation,
  deliverySucceededEventValidation,
  deliveryFailedEventValidation,
} from './notificationEventsValidations';

// Notification Event Type
export type NotificationEventType = z.infer<typeof notificationEventValidation>;

// Delivery Succeeded Event Type
export type DeliverySucceededEventType = z.infer<typeof deliverySucceededEventValidation>;

// Delivery Failed Event Type
export type DeliveryFailedEventType = z.infer<typeof deliveryFailedEventValidation>;
