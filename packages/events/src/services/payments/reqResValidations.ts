// validations/payments.ts

import { z } from 'zod';
import { paymentMethodValidationProps, payoutMethodValidationProps } from '../dbValidations/payments';

// Add Payment Method
export const addPaymentMethodRequestValidation = z.object({
  body: z.object({
    cardNumber: z.string(),
    cardHolderName: z.string(),
    expiryDate: z.string(),
    cardType: z.string(),
    billingAddress: z.string(),
  }),
});

export const addPaymentMethodResponseValidation = z.object({});

// Update Payment Method
export const updatePaymentMethodRequestValidation = z.object({
  body: z.object({
    paymentMethodID: z.string(),
    updates: z.object({
      cardNumber: z.string().optional(),
      cardHolderName: z.string().optional(),
      expiryDate: z.string().optional(),
      cardType: z.string().optional(),
      billingAddress: z.string().optional(),
    }),
  }),
});

export const updatePaymentMethodResponseValidation = z.object({});

// Remove Payment Method
export const removePaymentMethodRequestValidation = z.object({
  body: z.object({
    paymentMethodID: z.string(),
  }),
});

export const removePaymentMethodResponseValidation = z.object({});

// Add Payout Method
export const addPayoutMethodRequestValidation = z.object({
  body: z.object({
    accountNumber: z.string(),
    accountHolderName: z.string(),
    bankName: z.string(),
    routingNumber: z.string(),
    accountType: z.string(),
  }),
});

export const addPayoutMethodResponseValidation = z.object({});

// Update Payout Method
export const updatePayoutMethodRequestValidation = z.object({
  body: z.object({
    payoutMethodID: z.string(),
    updates: z.object({
      accountNumber: z.string().optional(),
      accountHolderName: z.string().optional(),
      bankName: z.string().optional(),
      routingNumber: z.string().optional(),
      accountType: z.string().optional(),
    }),
  }),
});

export const updatePayoutMethodResponseValidation = z.object({});

// Remove Payout Method
export const removePayoutMethodRequestValidation = z.object({
  body: z.object({
    payoutMethodID: z.string(),
  }),
});

export const removePayoutMethodResponseValidation = z.object({});
