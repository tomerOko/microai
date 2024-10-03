// validations/ratingEvents.ts
import * as z from 'zod';
import { ratingEventsNames } from '../names/rating';
import { reviewValidationProps, consultantRatingValidationProps } from '../../shared/validations/rating';

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

// validations/callEvents.ts
import { callEventsNames } from '../names/call';

export const callEndedEventValidation = z.object({
  type: z.literal(callEventsNames.CALL_ENDED),
  data: z.object({
    callID: z.string(),
    studentID: z.string(),
    consultantID: z.string(),
    endTime: z.date(),
  }),
});
