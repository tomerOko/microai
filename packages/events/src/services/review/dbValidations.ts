// dbValidations/rating.ts
import { z } from 'zod';
import { consultantRatingValidationProps, reviewReminderValidationProps, reviewValidationProps } from './shared';

export const ratingDbValidations = {
  review: z.object(reviewValidationProps),
  consultantRating: z.object(consultantRatingValidationProps),
  reviewReminder: z.object(reviewReminderValidationProps),
};
