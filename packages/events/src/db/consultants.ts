// consultant.ts (db documents validation)
import { z } from 'zod';
import { consultantValidationProps, topicValidationProps, userValidationProps } from '../shared';

export const consultantDbValidations = {
  user: z.object(userValidationProps),
  consultant: z.object(consultantValidationProps),
  topic: z.object(topicValidationProps),
};
