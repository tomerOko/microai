// tomeroko3-events/types/payments.ts
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
} from '../validation/payments';

export type AddPaymentMethodRequestType = z.infer<typeof addPaymentMethodRequestValidation>;
export type AddPaymentMethodResponseType = z.infer<typeof addPaymentMethodResponseValidation>;

export type UpdatePaymentMethodRequestType = z.infer<typeof updatePaymentMethodRequestValidation>;
export type UpdatePaymentMethodResponseType = z.infer<typeof updatePaymentMethodResponseValidation>;

export type RemovePaymentMethodRequestType = z.infer<typeof removePaymentMethodRequestValidation>;
export type RemovePaymentMethodResponseType = z.infer<typeof removePaymentMethodResponseValidation>;

export type AddPayoutMethodRequestType = z.infer<typeof addPayoutMethodRequestValidation>;
export type AddPayoutMethodResponseType = z.infer<typeof addPayoutMethodResponseValidation>;

export type UpdatePayoutMethodRequestType = z.infer<typeof updatePayoutMethodRequestValidation>;
export type UpdatePayoutMethodResponseType = z.infer<typeof updatePayoutMethodResponseValidation>;

export type RemovePayoutMethodRequestType = z.infer<typeof removePayoutMethodRequestValidation>;
export type RemovePayoutMethodResponseType = z.infer<typeof removePayoutMethodResponseValidation>;
