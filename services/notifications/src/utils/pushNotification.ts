// utils/pushNotifications.ts
export const sendPushNotification = async (
    pushToken: string,
    content: { title: string; message: string },
  ) => {
    // Implement push notification logic using a service like Firebase Cloud Messaging
    console.log(`Sending push notification to ${pushToken}: ${content.title}`);
  };
  