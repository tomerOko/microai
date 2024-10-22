// consumers.ts
import { functionWrapper } from 'common-lib-tomeroko3';
import {
  SendNotificationEventType,
  SendNotificationFundumentalEventType,
  UserCreatedEventType,
  UserUpdatedEventType,
} from 'events-tomeroko3';

import { usersCollection } from '../configs/mongoDB/initialization';
import { deliveryFailedPublisher, deliverySucceededPublisher } from '../configs/rabbitMQ/initialization';

import * as model from './dal';
import { sendEmail, sendPushNotification, sendSMS, sendWhatsApp } from './service';

export const handleSendNotificationEvent = async (eventData: SendNotificationEventType['data']) => {
  return functionWrapper(async () => {
    try {
      const { userID, channels, content } = eventData;

      const user = await usersCollection.findOne({ userID });
      if (!user) {
        throw new Error('User not found');
      }

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

      deliverySucceededPublisher({
        userID,
        channels,
        content,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      deliveryFailedPublisher({
        userID: eventData.userID,
        error: error.message,
        timestamp: new Date().toISOString(),
      });
    }
  });
};

export const handleSendNotificationFundeEvent = async (eventData: SendNotificationFundumentalEventType['data']) => {
  return functionWrapper(async () => {
    try {
      const { content, addresses } = eventData;
      addresses.forEach(async (address) => {
        const { channel, address: recipient } = address;
        switch (channel) {
          case 'EMAIL':
            await sendEmail(recipient, content.subject || '', content.body);
            break;
          case 'SMS':
            await sendSMS(recipient, content.body);
            break;
          case 'WHATSAPP':
            await sendWhatsApp(recipient, content.body);
            break;
          case 'PUSH_NOTIFICATION':
            await sendPushNotification([recipient], content.body);
            break;
          default:
            throw new Error(`Unknown channel: ${channel}`);
        }
      });
    } catch (error: any) {
      console.error('Error handling SendNotificationFundumentalEvent:', error);
    }
  });
};

export const handleUserCreatedEvent = async (eventData: UserCreatedEventType['data']) => {
  return functionWrapper(async () => {
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
  });
};

export const handleUserUpdatedEvent = async (eventData: UserUpdatedEventType['data']) => {
  return functionWrapper(async () => {
    const { ID, email, firstName, lastName, phone } = eventData;
    model.updateUserByID(ID, { email });
  });
};
