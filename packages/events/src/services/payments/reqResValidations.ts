// tomeroko3-events/validation/payments.ts
import { z } from 'zod';

import { paymentMethodValidationProps, payoutMethodValidationProps } from '../shared/validations/payments';

export const addPaymentMethodRequestValidation = z.object({
  body: z.object(paymentMethodValidationProps),
});

export const addPaymentMethodResponseValidation = z.object({});

export const updatePaymentMethodRequestValidation = z.object({
  body: z.object({
    paymentMethodID: z.string(),
    updates: z.object(paymentMethodValidationProps).partial(),
  }),
});

export const updatePaymentMethodResponseValidation = z.object({});

export const removePaymentMethodRequestValidation = z.object({
  body: z.object({
    paymentMethodID: z.string(),
  }),
});

export const removePaymentMethodResponseValidation = z.object({});

export const addPayoutMethodRequestValidation = z.object({
  body: z.object(payoutMethodValidationProps),
});

export const addPayoutMethodResponseValidation = z.object({});

export const updatePayoutMethodRequestValidation = z.object({
  body: z.object({
    payoutMethodID: z.string(),
    updates: z.object(payoutMethodValidationProps).partial(),
  }),
});

export const updatePayoutMethodResponseValidation = z.object({});

export const removePayoutMethodRequestValidation = z.object({
  body: z.object({
    payoutMethodID: z.string(),
  }),
});

export const removePayoutMethodResponseValidation = z.object({});
