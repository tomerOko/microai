// tomeroko3-events/dbValidations/payments.ts
import { z } from 'zod';
import {
  paymentMethodValidationProps,
  payoutMethodValidationProps,
  paymentRecordValidationProps,
  payoutRecordValidationProps,
  paymentConsultantValidationProps,
} from './shared';

export const paymentsDbValidations = {
  paymentMethod: z.object(paymentMethodValidationProps),
  payoutMethod: z.object(payoutMethodValidationProps),
  paymentRecord: z.object(paymentRecordValidationProps),
  payoutRecord: z.object(payoutRecordValidationProps),
  consultant: z.object(paymentConsultantValidationProps),
};
