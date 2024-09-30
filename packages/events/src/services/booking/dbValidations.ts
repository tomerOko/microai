// bookings.ts (db documents validation)
import { z } from 'zod';
import { bookingValidationProps } from '../shared/validations/bookings';
import { availabilityBlockValidationProps } from '../shared/validations/availabilities';

export const bookingsDbValidations = {
  booking: z.object(bookingValidationProps),
  availabilityBlock: z.object(availabilityBlockValidationProps),
};
