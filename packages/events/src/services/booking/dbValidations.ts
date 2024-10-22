// bookings.ts (db documents validation)
import { z } from 'zod';
import { bookingValidationProps } from './shared';
import { availabilityBlockValidationProps } from '../ava';

export const bookingsDbValidations = {
  booking: z.object(bookingValidationProps),
  availabilityBlock: z.object(availabilityBlockValidationProps),
};
