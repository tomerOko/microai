// tomeroko3-events/shared/validations/payments.ts
import { z } from 'zod';

export const paymentMethodValidationProps = {
  ID: z.string().optional(),
  userID: z.string(),
  cardNumber: z.string(),
  cardHolderName: z.string(),
  expiryDate: z.string(),
  cardType: z.string(),
  billingAddress: z.string(),
};

export const payoutMethodValidationProps = {
  ID: z.string().optional(),
  consultantID: z.string(),
  accountNumber: z.string(),
  accountHolderName: z.string(),
  bankName: z.string(),
  routingNumber: z.string(),
  accountType: z.string(),
};

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

export const payoutRecordValidationProps = {
  ID: z.string().optional(),
  consultantID: z.string(),
  amount: z.number(),
  status: z.enum(['processed', 'failed']),
  receiptURL: z.string(),
  createdAt: z.string(),
};

export const paymentConsultantValidationProps = {
  ID: z.string(),
  name: z.string(),
  email: z.string(),
};
