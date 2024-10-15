// dal.ts

import { functionWrapper } from 'common-lib';
import {
  UserPreferences,
  ScheduledNotification,
  userPreferencesCollection,
  scheduledNotificationsCollection,
  Notification,
  notificationsCollection,
} from './configs/mongoDB/initialization';

// Get user preferences by user ID
export const getUserPreferences = async (userID: string): Promise<UserPreferences | null> => {
  return functionWrapper(async () => {
    const preferences = await userPreferencesCollection.findOne({ userID });
    return preferences;
  });
};

// Update user preferences
export const updateUserPreferences = async (userID: string, preferences: UserPreferences['preferences']) => {
  return functionWrapper(async () => {
    await userPreferencesCollection.updateOne(
      { userID },
      { $set: { preferences } },
      { upsert: true }
    );
  });
};

// Save scheduled notification
export const saveScheduledNotification = async (notification: ScheduledNotification) => {
  return functionWrapper(async () => {
    await scheduledNotificationsCollection.insertOne(notification);
  });
};

// Get due scheduled notifications
export const getDueScheduledNotifications = async (currentTime: Date): Promise<ScheduledNotification[]> => {
  return functionWrapper(async () => {
    const notifications = await scheduledNotificationsCollection
      .find({ sendTime: { $lte: currentTime.toISOString() }, status: 'pending' })
      .toArray();
    return notifications;
  });
};

// Update notification status
export const updateNotificationStatus = async (notificationID: string, status: 'sent' | 'failed') => {
  return functionWrapper(async () => {
    await scheduledNotificationsCollection.updateOne(
      { notificationID },
      { $set: { status } }
    );
  });
};

// Save notification record
export const saveNotification = async (notification: Notification) => {
  return functionWrapper(async () => {
    await notificationsCollection.insertOne(notification);
  });
};

// Get user notifications
export const getUserNotifications = async (userID: string): Promise<Notification[]> => {
  return functionWrapper(async () => {
    const notifications = await notificationsCollection
      .find({ userID })
      .sort({ createdAt: -1 })
      .toArray();
    return notifications;
  });
};
