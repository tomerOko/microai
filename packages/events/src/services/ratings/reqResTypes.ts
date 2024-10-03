// types/rating.ts
import * as z from 'zod';
import {
  submitReviewRequestValidation,
  submitReviewResponseValidation,
  submitLongTermReviewRequestValidation,
  submitLongTermReviewResponseValidation,
  getReviewsRequestValidation,
  getReviewsResponseValidation,
} from '../validation/rating';

export type submitReviewRequestType = z.infer<typeof submitReviewRequestValidation>;
export type submitReviewResponseType = z.infer<typeof submitReviewResponseValidation>;

export type submitLongTermReviewRequestType = z.infer<typeof submitLongTermReviewRequestValidation>;
export type submitLongTermReviewResponseType = z.infer<typeof submitLongTermReviewResponseValidation>;

export type getReviewsRequestType = z.infer<typeof getReviewsRequestValidation>;
export type getReviewsResponseType = z.infer<typeof getReviewsResponseValidation>;
