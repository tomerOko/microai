// service.ts

import { functionWrapper } from 'common-lib';
import * as model from './dal';
import { NotificationContentGenerator } from './utils/contentGenerator';
import { scheduleNotification } from './utils/notificationScheduler';
import { notificationEventPublisher } from './configs/rabbitMQ/initialization';
import { appErrorCodes } from './appErrorCodes';
import {
  NotificationEventType,
  NotificationChannel,
  UserPreferences,
  Notification,
} from './shared/types/notifications';

// Notification Processor

export const processNotification = async (
  userID: string,
  eventType: string,
  eventData: any,
  notificationType: 'immediate' | 'scheduled',
  sendTime?: Date
) => {
  return functionWrapper(async () => {
    const userPreferences = await model.getUserPreferences(userID);

    if (!userPreferences) {
      throw new Error(appErrorCodes.USER_NOT_FOUND);
    }

    const preferredChannels = userPreferences.preferences[eventType] || [];

    if (preferredChannels.length === 0) {
      // User has opted out of this notification
      return;
    }

    const contactInfo = userPreferences.contactInfo;

    // Generate content
    const content = NotificationContentGenerator.generateContent(eventType, eventData);

    // Create notification events
    const notifications: NotificationEventType[] = preferredChannels.map((channel: NotificationChannel) => ({
      userID,
      address: contactInfo[channel],
      content,
      communicationType: channel,
    }));

    if (notificationType === 'immediate') {
      // Publish notifications immediately
      for (const notification of notifications) {
        notificationEventPublisher(notification);
      }
    } else if (notificationType === 'scheduled' && sendTime) {
      // Schedule notifications
      for (const notification of notifications) {
        await scheduleNotification(notification, sendTime);
      }
    } else {
      throw new Error(appErrorCodes.INVALID_NOTIFICATION_TYPE);
    }

    // Save notification records
    for (const notification of notifications) {
      await model.saveNotification({
        notificationID: notification.notificationID || '',
        userID,
        content: notification.content,
        createdAt: new Date().toISOString(),
        read: false,
      });
    }
  });
};

// Get user notifications
export const getUserNotifications = async (userID: string): Promise<Notification[]> => {
  return functionWrapper(async () => {
    const notifications = await model.getUserNotifications(userID);
    return notifications;
  });
};

// Update user preferences
export const updateUserPreferences = async (userID: string, preferences: UserPreferences['preferences']) => {
  return functionWrapper(async () => {
    await model.updateUserPreferences(userID, preferences);
  });
};
