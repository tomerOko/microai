// events/names.ts

export const paymentEventsNames = {
  PAYMENT_METHOD_ADDED: 'PAYMENT_METHOD_ADDED',
  PAYMENT_METHOD_UPDATED: 'PAYMENT_METHOD_UPDATED',
  PAYMENT_METHOD_REMOVED: 'PAYMENT_METHOD_REMOVED',
  PAYOUT_METHOD_ADDED: 'PAYOUT_METHOD_ADDED',
  PAYOUT_METHOD_UPDATED: 'PAYOUT_METHOD_UPDATED',
  PAYOUT_METHOD_REMOVED: 'PAYOUT_METHOD_REMOVED',
  PAYMENT_PROCESSED: 'PAYMENT_PROCESSED',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  RECEIPT_GENERATED: 'RECEIPT_GENERATED',
  PAYOUT_PROCESSED: 'PAYOUT_PROCESSED',
  PAYOUT_FAILED: 'PAYOUT_FAILED',
  PAYOUT_RECEIPT_GENERATED: 'PAYOUT_RECEIPT_GENERATED',
} as const;
