// notifications.ts (db documents validation)
import { z } from 'zod';
import { notificationValidationProps } from '../shared/validations/notifications';

export const notificationsDbValidations = {
  notification: z.object(notificationValidationProps),
};
