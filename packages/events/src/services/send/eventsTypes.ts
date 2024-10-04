// events/types/send.ts
import { z } from 'zod';
import {
  sendNotificationEventValidation,
  sendPincodeEmailEventValidation,
  deliverySucceededEventValidation,
  deliveryFailedEventValidation,
  retryScheduledEventValidation,
} from '../validations/send';

export type SendNotificationEventType = z.infer<typeof sendNotificationEventValidation>;
export type SendPincodeEmailEventType = z.infer<typeof sendPincodeEmailEventValidation>;
export type DeliverySucceededEventType = z.infer<typeof deliverySucceededEventValidation>;
export type DeliveryFailedEventType = z.infer<typeof deliveryFailedEventValidation>;
export type RetryScheduledEventType = z.infer<typeof retryScheduledEventValidation>;
