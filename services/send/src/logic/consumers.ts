// consumers.ts
import {
  SendNotificationEventType,
  SendPincodeEmailEventType,
  UserCreatedEventType,
  UserUpdatedEventType,
} from 'events-tomeroko3';

import {
  sendEmail,
  sendSMS,
  sendWhatsApp,
  sendPushNotification,
} from '../service';

import {
  deliverySucceededPublisher,
  deliveryFailedPublisher,
} from '../configs/rabbitMQ/initialization';
import { usersCollection } from '../configs/mongoDB/initialization';

/**
 * Handles the SEND_NOTIFICATION event by sending notifications via specified channels.
 * Publishes DELIVERY_SUCCEEDED or DELIVERY_FAILED events based on the outcome.
 */
export const handleSendNotificationEvent = async (
  eventData: SendNotificationEventType['data']
) => {
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
  } catch (error) {
    // Publish DELIVERY_FAILED event
    deliveryFailedPublisher({
      userID: eventData.userID,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Handles the SEND_PINCODE_EMAIL event by sending a pincode email to the user.
 * Publishes DELIVERY_SUCCEEDED or DELIVERY_FAILED events based on the outcome.
 */
export const handleSendPincodeEmailEvent = async (
  eventData: SendPincodeEmailEventType['data']
) => {
  try {
    const { email, pincode } = eventData;

    // Send pincode email
    await sendEmail(email, 'Your Pincode', `Your pincode is: ${pincode}`);

    // Publish DELIVERY_SUCCEEDED event
    deliverySucceededPublisher({
      email,
      channel: 'EMAIL',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Publish DELIVERY_FAILED event
    deliveryFailedPublisher({
      email: eventData.email,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Handles the USER_CREATED event by storing the new user in the local users collection.
 */
export const handleUserCreatedEvent = async (
  eventData: UserCreatedEventType['data']
) => {
  try {
    // Insert the new user into the local users collection
    await usersCollection.insertOne(eventData);
  } catch (error) {
    // Handle error
    console.error('Error handling UserCreatedEvent:', error);
  }
};

/**
 * Handles the USER_UPDATED event by updating the user in the local users collection.
 */
export const handleUserUpdatedEvent = async (
  eventData: UserUpdatedEventType['data']
) => {
  try {
    const { userID, update } = eventData;
    await usersCollection.updateOne({ userID }, { $set: update });
  } catch (error) {
    console.error('Error handling UserUpdatedEvent:', error);
  }
};
