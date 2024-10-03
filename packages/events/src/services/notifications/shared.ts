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

// Scheduled Notification Validation Schema
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

// Notification Record Validation Schema
export const notificationValidationProps = {
  notificationID: z.string(),
  userID: z.string(),
  content: z.string(),
  createdAt: z.string(),
  read: z.boolean(),
};

export const notificationsDbValidations = {
  userPreferences: z.object(userPreferencesValidationProps),
  scheduledNotification: z.object(scheduledNotificationValidationProps),
  notification: z.object(notificationValidationProps),
};

// User Preferences Type
export type UserPreferences = z.infer<z.ZodObject<typeof userPreferencesValidationProps>>;

// Scheduled Notification Type
export type ScheduledNotification = z.infer<z.ZodObject<typeof scheduledNotificationValidationProps>>;

// Notification Type
export type Notification = z.infer<z.ZodObject<typeof notificationValidationProps>>;

// Notification Event Type
export type NotificationEventType = {
  userID: string;
  address: string;
  content: string;
  communicationType: NotificationChannel;
  notificationID?: string;
};

export type NotificationChannel = 'email' | 'sms' | 'whatsapp' | 'inApp';

// Request and Response Types for Controller

export type GetNotificationsRequestType = {
  params: {};
};

export type UpdatePreferencesRequestType = {
  body: {
    preferences: UserPreferences['preferences'];
  };
};
