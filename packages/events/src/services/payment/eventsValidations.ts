// tomeroko3-events/validations/payments.ts
import { z } from 'zod';
import { paymentEventsNames } from './eventsNames';

export const paymentMethodAddedEventValidation = z.object({
  type: z.literal(paymentEventsNames.PAYMENT_METHOD_ADDED),
  data: z.object({
    userID: z.string(),
    paymentMethodID: z.string(),
  }),
});

export const paymentMethodUpdatedEventValidation = z.object({
  type: z.literal(paymentEventsNames.PAYMENT_METHOD_UPDATED),
  data: z.object({
    userID: z.string(),
    paymentMethodID: z.string(),
  }),
});

export const paymentMethodRemovedEventValidation = z.object({
  type: z.literal(paymentEventsNames.PAYMENT_METHOD_REMOVED),
  data: z.object({
    userID: z.string(),
    paymentMethodID: z.string(),
  }),
});

export const payoutMethodAddedEventValidation = z.object({
  type: z.literal(paymentEventsNames.PAYOUT_METHOD_ADDED),
  data: z.object({
    consultantID: z.string(),
    payoutMethodID: z.string(),
  }),
});

export const payoutMethodUpdatedEventValidation = z.object({
  type: z.literal(paymentEventsNames.PAYOUT_METHOD_UPDATED),
  data: z.object({
    consultantID: z.string(),
    payoutMethodID: z.string(),
  }),
});

export const payoutMethodRemovedEventValidation = z.object({
  type: z.literal(paymentEventsNames.PAYOUT_METHOD_REMOVED),
  data: z.object({
    consultantID: z.string(),
    payoutMethodID: z.string(),
  }),
});

export const paymentProcessedEventValidation = z.object({
  type: z.literal(paymentEventsNames.PAYMENT_PROCESSED),
  data: z.object({
    bookingID: z.string(),
    studentID: z.string(),
    receiptURL: z.string(),
  }),
});

export const paymentFailedEventValidation = z.object({
  type: z.literal(paymentEventsNames.PAYMENT_FAILED),
  data: z.object({
    bookingID: z.string(),
    studentID: z.string(),
    reason: z.string(),
  }),
});

export const receiptGeneratedEventValidation = z.object({
  type: z.literal(paymentEventsNames.RECEIPT_GENERATED),
  data: z.object({
    bookingID: z.string(),
    receiptURL: z.string(),
  }),
});

export const payoutProcessedEventValidation = z.object({
  type: z.literal(paymentEventsNames.PAYOUT_PROCESSED),
  data: z.object({
    consultantID: z.string(),
    amount: z.number(),
    receiptURL: z.string(),
  }),
});

export const payoutFailedEventValidation = z.object({
  type: z.literal(paymentEventsNames.PAYOUT_FAILED),
  data: z.object({
    consultantID: z.string(),
    amount: z.number(),
    reason: z.string(),
  }),
});

export const payoutReceiptGeneratedEventValidation = z.object({
  type: z.literal(paymentEventsNames.PAYOUT_RECEIPT_GENERATED),
  data: z.object({
    consultantID: z.string(),
    receiptURL: z.string(),
  }),
});
