// dbValidations/payments.ts

import { z } from 'zod';

// Payment Method Validation Schema
export const paymentMethodValidationProps = {
  ID: z.string().optional(),
  userID: z.string(),
  cardNumber: z.string(),
  cardHolderName: z.string(),
  expiryDate: z.string(),
  cardType: z.string(),
  billingAddress: z.string(),
};

// Payout Method Validation Schema
export const payoutMethodValidationProps = {
  ID: z.string().optional(),
  consultantID: z.string(),
  accountNumber: z.string(),
  accountHolderName: z.string(),
  bankName: z.string(),
  routingNumber: z.string(),
  accountType: z.string(),
};

// Payment Record Validation Schema
export const paymentRecordValidationProps = {
  ID: z.string().optional(),
  bookingID: z.string(),
  studentID: z.string(),
  consultantID: z.string(),
  amount: z.number(),
  status: z.enum(['processed', 'failed']),
  receiptURL: z.string(),
  createdAt: z.string(),
};

// Payout Record Validation Schema
export const payoutRecordValidationProps = {
  ID: z.string().optional(),
  consultantID: z.string(),
  amount: z.number(),
  status: z.enum(['processed', 'failed']),
  receiptURL: z.string(),
  createdAt: z.string(),
};

// Exporting the validations
export const paymentsDbValidations = {
  paymentMethod: z.object(paymentMethodValidationProps),
  payoutMethod: z.object(payoutMethodValidationProps),
  paymentRecord: z.object(paymentRecordValidationProps),
  payoutRecord: z.object(payoutRecordValidationProps),
};
