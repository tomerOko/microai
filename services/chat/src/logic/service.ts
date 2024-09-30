/**
Business Logic Explanation:

sendMessage:

Validates that the chat room exists and the user is a participant.
Creates a message object and adds it to the chat room's messages array.
Publishes a MESSAGE_SENT event for real-time updates or notifications.
getChatRoomMessages:

Retrieves messages from a chat room if the user is a participant.
Ensures unauthorized users cannot access messages.
getChatRooms:

Retrieves all active chat rooms where the user is a participant.
Excludes archived chat rooms.


 * Final Notes
Event Handling: The Chat Service listens to booking events to create or archive chat rooms automatically.

Messaging Functionality: Users can send messages, retrieve chat history, and see all their active chat rooms.

Security: Authentication middleware ensures that only authorized users can perform actions and access chat data.

Event Publishing: When a message is sent, a MESSAGE_SENT event is published, which can be used for real-time updates or notifications in other services.

Scalability: The service is designed with scalability in mind, using event-driven architecture and stateless controllers.

Data Consistency: By handling events from other services, the Chat Service maintains data consistency across the system.
 
*/
// service.ts
import { AppError, functionWrapper, getAuthenticatedID } from 'common-lib-tomeroko3';
import {
  sendMessageRequestType,
  sendMessageResponseType,
  getChatRoomMessagesRequestType,
  getChatRoomMessagesResponseType,
  getChatRoomsRequestType,
  getChatRoomsResponseType,
} from 'events-tomeroko3';

import { messageSentPublisher } from '../configs/rabbitMQ/initialization';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';

export const sendMessage = async (
  props: sendMessageRequestType['body'],
): Promise<sendMessageResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const { chatRoomID, content, messageType } = props;

    const chatRoom = await model.getChatRoomByID(chatRoomID);
    if (!chatRoom) {
      throw new AppError(appErrorCodes.CHAT_ROOM_NOT_FOUND, { chatRoomID });
    }

    // Check if user is a participant
    if (!chatRoom.participants.includes(userID)) {
      throw new AppError(appErrorCodes.UNAUTHORIZED_ACTION, { chatRoomID, userID });
    }

    const message = {
      senderID: userID,
      content,
      timestamp: new Date().toISOString(),
      messageType,
    };

    await model.addMessageToChatRoom(chatRoomID, message);

    // Publish MESSAGE_SENT event
    messageSentPublisher({ chatRoomID, message });

    return { messageID: message.timestamp }; // Using timestamp as a unique identifier
  });
};

export const getChatRoomMessages = async (
  props: getChatRoomMessagesRequestType['params'],
): Promise<getChatRoomMessagesResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const { chatRoomID } = props;

    const chatRoom = await model.getChatRoomByID(chatRoomID);
    if (!chatRoom) {
      throw new AppError(appErrorCodes.CHAT_ROOM_NOT_FOUND, { chatRoomID });
    }

    // Check if user is a participant
    if (!chatRoom.participants.includes(userID)) {
      throw new AppError(appErrorCodes.UNAUTHORIZED_ACTION, { chatRoomID, userID });
    }

    return { messages: chatRoom.messages };
  });
};

export const getChatRooms = async (): Promise<getChatRoomsResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;

    const chatRooms = await model.getChatRoomsForUser(userID);

    // Map chat rooms to desired response format
    const chatRoomsResponse = chatRooms.map((chatRoom) => ({
      ID: chatRoom._id.toString(),
      bookingID: chatRoom.bookingID,
      participants: chatRoom.participants,
      createdAt: chatRoom.createdAt,
      isArchived: chatRoom.isArchived,
    }));

    return { chatRooms: chatRoomsResponse };
  });
};
