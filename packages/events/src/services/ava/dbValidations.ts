// availabilities.ts (db documents validation)
import { z } from 'zod';
import { availabilityBlockValidationProps, consultantAvailabilityValidationProps } from './shared';

export const availabilitiesDbValidations = {
  availabilityBlock: z.object(availabilityBlockValidationProps),
  consultantAvailability: z.object(consultantAvailabilityValidationProps),
};
