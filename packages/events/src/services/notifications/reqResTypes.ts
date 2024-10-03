// requestResponseTypes/notificationRequestResponseTypes.ts

import { z } from 'zod';
import {
  getNotificationsResponseValidation,
  updatePreferencesRequestValidation,
  updatePreferencesResponseValidation,
} from '../requestResponseValidations/notificationRequestResponseValidations';

// Get Notifications Response Type
export type GetNotificationsResponseType = z.infer<typeof getNotificationsResponseValidation>;

// Update Preferences Request Type
export type UpdatePreferencesRequestType = z.infer<typeof updatePreferencesRequestValidation>;

// Update Preferences Response Type
export type UpdatePreferencesResponseType = z.infer<typeof updatePreferencesResponseValidation>;
