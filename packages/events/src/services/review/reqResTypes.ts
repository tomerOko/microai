// types/rating.ts
import * as z from 'zod';
import {
  submitReviewRequestValidation,
  submitReviewResponseValidation,
  submitLongTermReviewRequestValidation,
  submitLongTermReviewResponseValidation,
  getTopicReviewsRequestValidation,
  getTopicReviewsResponseValidation,
  getConsultantReviewsRequestValidation,
  getConsultantReviewsResponseValidation,
} from './reqResValidations';

export type SubmitReviewRequestType = z.infer<typeof submitReviewRequestValidation>;
export type SubmitReviewResponseType = z.infer<typeof submitReviewResponseValidation>;

export type SubmitLongTermReviewRequestType = z.infer<typeof submitLongTermReviewRequestValidation>;
export type SubmitLongTermReviewResponseType = z.infer<typeof submitLongTermReviewResponseValidation>;

export type GetTopicReviewsRequestType = z.infer<typeof getTopicReviewsRequestValidation>;
export type GetTopicReviewsResponseType = z.infer<typeof getTopicReviewsResponseValidation>;

export type GetConsultantReviewsRequestType = z.infer<typeof getConsultantReviewsRequestValidation>;
export type GetConsultantReviewsResponseType = z.infer<typeof getConsultantReviewsResponseValidation>;
