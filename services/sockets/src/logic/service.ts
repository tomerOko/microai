// service.ts
import { AppError, functionWrapper } from 'common-lib-tomeroko3';
import WebSocket from 'ws';

import {
  messageDeliveredPublisher,
  notificationDeliveredPublisher,
  userOfflinePublisher,
  userOnlinePublisher,
} from '../configs/rabbitMQ/initialization';
import * as dal from './dal';

const userConnections = new Map<string, WebSocket>();

export const addUserConnection = (userID: string, ws: WebSocket) => {
  userConnections.set(userID, ws);
};

export const removeUserConnection = (userID: string) => {
  userConnections.delete(userID);
};

export const handleClientConnection = async (userID: string) => {
  return functionWrapper(async () => {
    await dal.updateUserStatus(userID, 'online');
    userOnlinePublisher({ userID });
  });
};

export const handleClientDisconnection = async (userID: string) => {
  return functionWrapper(async () => {
    await dal.updateUserStatus(userID, 'offline');
    userOfflinePublisher({ userID });
  });
};

export const deliverMessageToClients = async (targetUserIDs: string[], message: any) => {
  return functionWrapper(async () => {
    for (const userID of targetUserIDs) {
      const connection = userConnections.get(userID);
      if (connection && connection.readyState === WebSocket.OPEN) {
        connection.send(JSON.stringify(message));
      }
    }
    messageDeliveredPublisher({ messageID: message.ID });
  });
};

export const deliverNotificationToClients = async (targetUserIDs: string[], notification: any) => {
  return functionWrapper(async () => {
    for (const userID of targetUserIDs) {
      const connection = userConnections.get(userID);
      if (connection && connection.readyState === WebSocket.OPEN) {
        connection.send(JSON.stringify(notification));
      }
    }
    notificationDeliveredPublisher({ notificationID: notification.ID });
  });
};

export const getOnlineUsers = async () => {
  return functionWrapper(async () => {
    const users = await dal.getOnlineUsers();
    return { users };
  });
};
