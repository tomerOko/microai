import { z } from 'zod';

export const getNotificationsRequestValidation = z.object({});

export const getNotificationsResponseValidation = z.array(
  z.object({
    notificationID: z.string(),
    content: z.string(),
    createdAt: z.string(),
    read: z.boolean(),
  }),
);

export const updatePreferencesRequestValidation = z.object({
  preferences: z.record(z.string(), z.array(z.string())),
});

export const updatePreferencesResponseValidation = z.object({
  message: z.string(),
});
