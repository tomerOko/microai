/**
 Business Logic Explanation:

sendNotification:
Creates a notification record in the database.
Sends notifications via email and push notifications.
Uses helper functions to generate the content based on the notification type.

getNotifications:
Retrieves all notifications for a user.
Returns the notifications in a response format.

markNotificationAsRead:
Updates the notification status to 'read' in the database.

 */
import { functionWrapper } from 'common-lib-tomeroko3';
import {
  sendNotificationPropsType,
  getNotificationsResponseType,
  NotificationType,
} from 'events-tomeroko3';

import * as model from './dal';

import { sendEmail } from './utils/email';
import { sendPushNotification } from './utils/pushNotifications';

export const sendNotification = async (props: sendNotificationPropsType) => {
  return functionWrapper(async () => {
    const { userID, type, data } = props;

    // Create a notification document
    const notification: NotificationType = {
      userID,
      type,
      data,
      status: 'unread',
      createdAt: new Date().toISOString(),
    };

    // Save the notification to the database
    await model.createNotification(notification);

    // Send the notification via preferred channels
    // For simplicity, we'll assume email and push notifications are preferred
    const user = await getUserByID(userID); // Implement getUserByID to fetch user info
    if (user) {
      if (user.email) {
        await sendEmail(user.email, generateEmailContent(type, data));
      }
      if (user.pushToken) {
        await sendPushNotification(user.pushToken, generatePushContent(type, data));
      }
    }
  });
};

export const getNotifications = async (userID: string): Promise<getNotificationsResponseType> => {
  return functionWrapper(async () => {
    const notifications = await model.getNotificationsByUserID(userID);
    return { notifications };
  });
};

export const markNotificationAsRead = async (userID: string, notificationID: string) => {
  return functionWrapper(async () => {
    // Update the notification status to 'read'
    await model.updateNotificationStatus(notificationID, 'read');
    return {};
  });
};

// Placeholder function to fetch user information
async function getUserByID(userID: string) {
  // Implement logic to fetch user info from the Users Service or database
  return {
    email: 'user@example.com',
    pushToken: 'push_token',
  };
}

// Generate email content based on notification type
function generateEmailContent(type: string, data: any): { subject: string; body: string } {
  switch (type) {
    case 'BOOKING_REQUESTED':
      return {
        subject: 'New Booking Request',
        body: `You have a new booking request from a student.`,
      };
    case 'BOOKING_APPROVED':
      return {
        subject: 'Booking Approved',
        body: `Your booking has been approved by the consultant.`,
      };
    // Add cases for other notification types
    default:
      return {
        subject: 'Notification',
        body: 'You have a new notification.',
      };
  }
}

// Generate push notification content based on notification type
function generatePushContent(type: string, data: any): { title: string; message: string } {
  switch (type) {
    case 'NEW_MESSAGE':
      return {
        title: 'New Message',
        message: `You have a new message.`,
      };
    // Add cases for other notification types
    default:
      return {
        title: 'Notification',
        message: 'You have a new notification.',
      };
  }
}
