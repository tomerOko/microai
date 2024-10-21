// consumers.ts
import { functionWrapper } from 'common-lib-tomeroko3';
import { SendNotificationEventType, UserCreatedEventType, UserUpdatedEventType } from 'events-tomeroko3';

import { usersCollection } from '../configs/mongoDB/initialization';
import { deliveryFailedPublisher, deliverySucceededPublisher } from '../configs/rabbitMQ/initialization';

import * as model from './dal';
import { sendEmail, sendPushNotification, sendSMS, sendWhatsApp } from './service';

/**
 * Handles the SEND_NOTIFICATION event by sending notifications via specified channels.
 * Publishes DELIVERY_SUCCEEDED or DELIVERY_FAILED events based on the outcome.
 */
export const handleSendNotificationEvent = async (eventData: SendNotificationEventType['data']) => {
  try {
    const { userID, channels, content } = eventData;

    // Fetch user details from the database
    const user = await usersCollection.findOne({ userID });
    if (!user) {
      throw new Error('User not found');
    }

    // Send notifications via specified channels
    for (const channel of channels) {
      switch (channel) {
        case 'EMAIL':
          await sendEmail(user.email, content.subject || '', content.body);
          break;
        case 'SMS':
          if (user.phoneNumber) {
            await sendSMS(user.phoneNumber, content.body);
          } else {
            throw new Error('User phone number not available');
          }
          break;
        case 'WHATSAPP':
          if (user.phoneNumber) {
            await sendWhatsApp(user.phoneNumber, content.body);
          } else {
            throw new Error('User phone number not available');
          }
          break;
        case 'PUSH_NOTIFICATION':
          if (user.deviceTokens) {
            await sendPushNotification(user.deviceTokens, content.body);
          } else {
            throw new Error('User device tokens not available');
          }
          break;
        default:
          throw new Error(`Unknown channel: ${channel}`);
      }
    }

    // Publish DELIVERY_SUCCEEDED event
    deliverySucceededPublisher({
      userID,
      channels,
      content,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    // Publish DELIVERY_FAILED event
    deliveryFailedPublisher({
      userID: eventData.userID,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Handles the USER_CREATED event by storing the new user in the local users collection.
 */
export const handleUserCreatedEvent = async (eventData: UserCreatedEventType['data']) => {
  try {
    await usersCollection.insertOne({
      email: eventData.email,
      firstName: eventData.firstName,
      lastName: eventData.lastName,
      phoneNumber: eventData.phone,
      userID: eventData.ID,
    });
  } catch (error) {
    // Handle error
    console.error('Error handling UserCreatedEvent:', error);
  }
};

/**
 * Handles the USER_UPDATED event by updating the user in the local users collection.
 */
export const handleUserUpdatedEvent = async (eventData: UserUpdatedEventType['data']) => {
  return functionWrapper(async () => {
    const { ID, email, firstName, lastName, phone } = eventData;
    model.updateUserByID(ID, { email });
  });
};
