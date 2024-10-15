// utils/notificationScheduler.ts

import { v4 as uuidv4 } from 'uuid';
import * as model from '../dal';
import { ScheduledNotification } from '../shared/types/notifications';
import { notificationEventPublisher } from '../configs/rabbitMQ/initialization';

// Schedule a notification
export const scheduleNotification = async (notificationEvent: any, sendTime: Date) => {
  const scheduledNotification: ScheduledNotification = {
    notificationID: uuidv4(),
    userID: notificationEvent.userID,
    sendTime: sendTime.toISOString(),
    address: notificationEvent.address,
    content: notificationEvent.content,
    communicationType: notificationEvent.communicationType,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  await model.saveScheduledNotification(scheduledNotification);
};

// Scheduler process (to be run periodically)
export const processScheduledNotifications = async () => {
  const currentTime = new Date();
  const dueNotifications = await model.getDueScheduledNotifications(currentTime);

  for (const notification of dueNotifications) {
    try {
      // Publish the notification to the Send Service
      await notificationEventPublisher({
        address: notification.address,
        content: notification.content,
        communicationType: notification.communicationType,
      });
      // Update status to 'sent'
      await model.updateNotificationStatus(notification.notificationID, 'sent');
    } catch (error) {
      // Update status to 'failed' and log error
      await model.updateNotificationStatus(notification.notificationID, 'failed');
      console.error(`Failed to send scheduled notification ${notification.notificationID}:`, error);
    }
  }
};
