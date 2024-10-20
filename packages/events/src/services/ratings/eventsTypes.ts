// types/ratingEvents.ts
import * as z from 'zod';
import {
  reviewSubmittedEventValidation,
  longTermReviewSubmittedEventValidation,
  ratingUpdatedEventValidation,
} from './eventsValidations';

export type ReviewSubmittedEventType = z.infer<typeof reviewSubmittedEventValidation>;
export type LongTermReviewSubmittedEventType = z.infer<typeof longTermReviewSubmittedEventValidation>;
export type RatingUpdatedEventType = z.infer<typeof ratingUpdatedEventValidation>;
