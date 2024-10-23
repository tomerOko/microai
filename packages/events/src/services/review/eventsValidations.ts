// validations/ratingEvents.ts
import * as z from 'zod';
import { callEventsNames } from '../call';
import { ratingEventsNames } from './eventsNames';
import { consultantRatingValidationProps, reviewValidationProps } from './shared';

export const reviewSubmittedEventValidation = z.object({
  type: z.literal(ratingEventsNames.REVIEW_SUBMITTED),
  data: z.object(reviewValidationProps),
});

export const longTermReviewSubmittedEventValidation = z.object({
  type: z.literal(ratingEventsNames.LONG_TERM_REVIEW_SUBMITTED),
  data: z.object(reviewValidationProps),
});

export const ratingUpdatedEventValidation = z.object({
  type: z.literal(ratingEventsNames.RATING_UPDATED),
  data: z.object(consultantRatingValidationProps),
});
