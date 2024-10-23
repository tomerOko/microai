// requestResponseTypes/notificationRequestResponseTypes.ts

import { z } from 'zod';
import {
  getNotificationsResponseValidation,
  updatePreferencesRequestValidation,
  updatePreferencesResponseValidation,
} from './reqResValidations';

export type GetNotificationsResponseType = z.infer<typeof getNotificationsResponseValidation>;
export type UpdatePreferencesRequestType = z.infer<typeof updatePreferencesRequestValidation>;
export type UpdatePreferencesResponseType = z.infer<typeof updatePreferencesResponseValidation>;
