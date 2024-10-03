// requestResponseValidations/notificationRequestResponseValidations.ts

import { z } from 'zod';

// Get Notifications Response Validation
export const getNotificationsResponseValidation = z.array(
  z.object({
    notificationID: z.string(),
    content: z.string(),
    createdAt: z.string(),
    read: z.boolean(),
  }),
);

// Update Preferences Request Validation
export const updatePreferencesRequestValidation = z.object({
  preferences: z.record(z.string(), z.array(z.string())),
});

// Update Preferences Response Validation
export const updatePreferencesResponseValidation = z.object({
  message: z.string(),
});
