// events/types/send.ts
import { z } from 'zod';
import {
  sendNotificationEventValidation,
  deliverySucceededEventValidation,
  deliveryFailedEventValidation,
  retryScheduledEventValidation,
  sendNotificationFundumentalEventValidation,
} from './eventsValidations';

export type SendNotificationEventType = z.infer<typeof sendNotificationEventValidation>;
export type SendNotificationFundumentalEventType = z.infer<typeof sendNotificationFundumentalEventValidation>;
export type DeliverySucceededEventType = z.infer<typeof deliverySucceededEventValidation>;
export type DeliveryFailedEventType = z.infer<typeof deliveryFailedEventValidation>;
export type RetryScheduledEventType = z.infer<typeof retryScheduledEventValidation>;
