// notifications.ts (shared validations)
import z from 'zod';

export const notificationValidationProps = {
  ID: z.string().optional(),
  userID: z.string(),
  type: z.string(),
  data: z.any(),
  status: z.enum(['read', 'unread']),
  createdAt: z.string(), // ISO date string
};
