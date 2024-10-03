// dbValidations/rating.ts
import { z } from 'zod';
import {
  reviewValidationProps,
  consultantRatingValidationProps,
  reviewReminderValidationProps,
} from '../shared/validations/rating';

export const ratingDbValidations = {
  review: z.object(reviewValidationProps),
  consultantRating: z.object(consultantRatingValidationProps),
  reviewReminder: z.object(reviewReminderValidationProps),
};
