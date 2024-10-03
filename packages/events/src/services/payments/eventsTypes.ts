// tomeroko3-events/types/payments.ts
import { z } from 'zod';
import {
  paymentMethodAddedEventValidation,
  paymentMethodUpdatedEventValidation,
  paymentMethodRemovedEventValidation,
  payoutMethodAddedEventValidation,
  payoutMethodUpdatedEventValidation,
  payoutMethodRemovedEventValidation,
  paymentProcessedEventValidation,
  paymentFailedEventValidation,
  receiptGeneratedEventValidation,
  payoutProcessedEventValidation,
  payoutFailedEventValidation,
  payoutReceiptGeneratedEventValidation,
} from '../validations/payments';

export type PaymentMethodAddedEventType = z.infer<typeof paymentMethodAddedEventValidation>;
export type PaymentMethodUpdatedEventType = z.infer<typeof paymentMethodUpdatedEventValidation>;
export type PaymentMethodRemovedEventType = z.infer<typeof paymentMethodRemovedEventValidation>;

export type PayoutMethodAddedEventType = z.infer<typeof payoutMethodAddedEventValidation>;
export type PayoutMethodUpdatedEventType = z.infer<typeof payoutMethodUpdatedEventValidation>;
export type PayoutMethodRemovedEventType = z.infer<typeof payoutMethodRemovedEventValidation>;

export type PaymentProcessedEventType = z.infer<typeof paymentProcessedEventValidation>;
export type PaymentFailedEventType = z.infer<typeof paymentFailedEventValidation>;
export type ReceiptGeneratedEventType = z.infer<typeof receiptGeneratedEventValidation>;

export type PayoutProcessedEventType = z.infer<typeof payoutProcessedEventValidation>;
export type PayoutFailedEventType = z.infer<typeof payoutFailedEventValidation>;
export type PayoutReceiptGeneratedEventType = z.infer<typeof payoutReceiptGeneratedEventValidation>;
