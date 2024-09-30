// search.ts (shared validations)
import z from 'zod';

export const consultantDocumentValidationProps = {
  ID: z.string(),
  name: z.string(),
  description: z.string(),
  topics: z.array(
    z.object({
      ID: z.string(),
      name: z.string(),
      description: z.string(),
    }),
  ),
  rating: z.number(),
  hourlyRate: z.number(),
  availableNow: z.boolean(),
};

export const topicDocumentValidationProps = {
  ID: z.string(),
  consultantID: z.string(),
  name: z.string(),
  description: z.string(),
};
