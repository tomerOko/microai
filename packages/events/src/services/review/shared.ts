// shared/validations/rating.ts
import z from 'zod';

export const reviewValidationProps = {
  userID: z.string(),
  consultantID: z.string(),
  topicID: z.string(),
  rating: z.number().min(1).max(5),
  feedback: z.string().optional(),
  callID: z.string(),
  type: z.enum(['immediate', 'long-term']),
  date: z.date(),
};

export const consultantRatingValidationProps = {
  consultantID: z.string(),
  rating: z.number().min(1).max(5),
};

export const topicRatingValidationProps = {
  topicID: z.string(),
  rating: z.number().min(1).max(5),
};

export const reviewReminderValidationProps = {
  callID: z.string(),
  studentID: z.string(),
  consultantID: z.string(),
  reminderDate: z.date(),
};

export const ratingUserValidationProps = {
  ID: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  // Add other user fields as necessary
};
