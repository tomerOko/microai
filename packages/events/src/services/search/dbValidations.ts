// search.ts (db documents validation)
import { z } from 'zod';
import { consultantDocumentValidationProps, topicDocumentValidationProps } from './shared';

export const searchIndexValidations = {
  consultantDocument: z.object(consultantDocumentValidationProps),
  topicDocument: z.object(topicDocumentValidationProps),
};
