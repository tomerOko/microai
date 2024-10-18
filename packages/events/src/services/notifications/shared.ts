// shared/validations/notifications.ts

import { z } from 'zod';

// User Preferences Validation Schema
export const userPreferencesValidationProps = {
  userID: z.string(),
  preferences: z.record(z.string(), z.array(z.string())),
  contactInfo: z.object({
    email: z.string().email().optional(),
    sms: z.string().optional(),
    whatsapp: z.string().optional(),
    inApp: z.string().optional(),
  }),
};

export const scheduledNotificationValidationProps = {
  notificationID: z.string(),
  userID: z.string(),
  sendTime: z.string(), // ISO8601 timestamp
  address: z.string(),
  content: z.string(),
  communicationType: z.string(), // "email", "sms", "whatsapp", "inApp"
  status: z.enum(['pending', 'sent', 'failed']),
  createdAt: z.string(),
};

export const notificationValidationProps = {
  notificationID: z.string(),
  userID: z.string(),
  content: z.string(),
  createdAt: z.string(),
  read: z.boolean(),
};

export type NotificationChannel = 'email' | 'sms' | 'whatsapp' | 'inApp';
