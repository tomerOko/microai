// types/ratingEvents.ts
import * as z from 'zod';
import {
  reviewSubmittedEventValidation,
  longTermReviewSubmittedEventValidation,
  ratingUpdatedEventValidation,
} from '../validations/ratingEvents';

export type ReviewSubmittedEventType = z.infer<typeof reviewSubmittedEventValidation>;
export type LongTermReviewSubmittedEventType = z.infer<typeof longTermReviewSubmittedEventValidation>;
export type RatingUpdatedEventType = z.infer<typeof ratingUpdatedEventValidation>;

// types/callEvents.ts
import { callEndedEventValidation } from '../validations/callEvents';

export type CallEndedEventType = z.infer<typeof callEndedEventValidation>;
