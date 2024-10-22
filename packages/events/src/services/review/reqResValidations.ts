// validation/rating.ts
import { z } from 'zod';
import { reviewValidationProps } from './shared';

export const submitReviewRequestValidation = z.object({
  body: z.object({
    consultantID: z.string(),
    topicID: z.string(),
    rating: z.number().min(1).max(5),
    feedback: z.string().optional(),
    callID: z.string(),
  }),
});

export const submitReviewResponseValidation = z.object({
  message: z.string(),
});

export const submitLongTermReviewRequestValidation = z.object({
  body: z.object({
    consultantID: z.string(),
    topicID: z.string(),
    rating: z.number().min(1).max(5),
    feedback: z.string().optional(),
    callID: z.string(),
  }),
});

export const submitLongTermReviewResponseValidation = z.object({
  message: z.string(),
});

export const getConsultantReviewsRequestValidation = z.object({
  query: z.object({
    consultantID: z.string(),
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const getConsultantReviewsResponseValidation = z.object({
  reviews: z.array(z.object(reviewValidationProps)),
  rating: z.number().min(1).max(5),
  totalReviews: z.number(),
});

export const getTopicReviewsRequestValidation = z.object({
  query: z.object({
    topicID: z.string(),
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const getTopicReviewsResponseValidation = z.object({
  reviews: z.array(z.object(reviewValidationProps)),
  rating: z.number().min(1).max(5),
  totalReviews: z.number(),
});
