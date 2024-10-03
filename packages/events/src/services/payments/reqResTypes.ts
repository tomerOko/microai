// types/payments.ts

import { z } from 'zod';
import {
  addPaymentMethodRequestValidation,
  addPaymentMethodResponseValidation,
  updatePaymentMethodRequestValidation,
  updatePaymentMethodResponseValidation,
  removePaymentMethodRequestValidation,
  removePaymentMethodResponseValidation,
  addPayoutMethodRequestValidation,
  addPayoutMethodResponseValidation,
  updatePayoutMethodRequestValidation,
  updatePayoutMethodResponseValidation,
  removePayoutMethodRequestValidation,
  removePayoutMethodResponseValidation,
} from '../validations/payments';

// Add Payment Method
export type AddPaymentMethodRequestType = z.infer<typeof addPaymentMethodRequestValidation>;
export type AddPaymentMethodResponseType = z.infer<typeof addPaymentMethodResponseValidation>;

// Update Payment Method
export type UpdatePaymentMethodRequestType = z.infer<typeof updatePaymentMethodRequestValidation>;
export type UpdatePaymentMethodResponseType = z.infer<typeof updatePaymentMethodResponseValidation>;

// Remove Payment Method
export type RemovePaymentMethodRequestType = z.infer<typeof removePaymentMethodRequestValidation>;
export type RemovePaymentMethodResponseType = z.infer<typeof removePaymentMethodResponseValidation>;

// Add Payout Method
export type AddPayoutMethodRequestType = z.infer<typeof addPayoutMethodRequestValidation>;
export type AddPayoutMethodResponseType = z.infer<typeof addPayoutMethodResponseValidation>;

// Update Payout Method
export type UpdatePayoutMethodRequestType = z.infer<typeof updatePayoutMethodRequestValidation>;
export type UpdatePayoutMethodResponseType = z.infer<typeof updatePayoutMethodResponseValidation>;

// Remove Payout Method
export type RemovePayoutMethodRequestType = z.infer<typeof removePayoutMethodRequestValidation>;
export type RemovePayoutMethodResponseType = z.infer<typeof removePayoutMethodResponseValidation>;
