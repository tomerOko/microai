// bookings.ts (db documents validation)
import { z } from 'zod';
import { bookingValidationProps } from './shared';
import { availabilityBlockValidationProps } from '../availabilites';

export const bookingsDbValidations = {
  booking: z.object(bookingValidationProps),
  availabilityBlock: z.object(availabilityBlockValidationProps),
};
