// dal.ts
import { OptionalID, functionWrapper } from 'common-lib-tomeroko3';
import { ObjectId } from 'mongodb';

import {
  Notification,
  notificationsCollection,
} from '../configs/mongoDB/initialization';

// Create a new notification
export const createNotification = async (notification: OptionalID<Notification>) => {
  return functionWrapper(async () => {
    const result = await notificationsCollection.insertOne(notification);
    return result.insertedId.toString();
  });
};

// Get notifications for a user
export const getNotificationsByUserID = async (userID: string) => {
  return functionWrapper(async () => {
    const notifications = await notificationsCollection
      .find({ userID })
      .sort({ createdAt: -1 })
      .toArray();
    return notifications;
  });
};

// Mark a notification as read
export const updateNotificationStatus = async (notificationID: string, status: 'read' | 'unread') => {
  return functionWrapper(async () => {
    await notificationsCollection.updateOne(
      { _id: new ObjectId(notificationID) },
      { $set: { status } },
    );
  });
};
