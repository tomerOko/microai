// notifications.ts (request and response validations)
import { z } from 'zod';
import { notificationValidationProps } from '../../shared/validations/notifications';

export const getNotificationsRequestValidation = z.object({});

export const getNotificationsResponseValidation = z.object({
  notifications: z.array(z.object(notificationValidationProps)),
});

export const markNotificationAsReadRequestValidation = z.object({
  body: z.object({
    notificationID: z.string(),
  }),
});

export const markNotificationAsReadResponseValidation = z.object({});
