// search.ts (request and response validations)
import { z } from 'zod';

export const searchRequestValidation = z.object({
  body: z.object({
    query: z.string(),
    filters: z
      .object({
        topic: z.string().optional(),
        rating: z.number().optional(),
        hourlyRate: z.number().optional(),
        availableNow: z.boolean().optional(),
      })
      .optional(),
  }),
});

export const searchResponseValidation = z.object({
  results: z.array(z.object(consultantDocumentValidationProps)),
});

export const getRecommendationsRequestValidation = z.object({
  query: z.object({
    limit: z.number().optional(),
  }),
});

export const getRecommendationsResponseValidation = z.object({
  recommendations: z.array(z.object(consultantDocumentValidationProps)),
});
