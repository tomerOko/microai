// dal.ts
import { OptionalID, functionWrapper } from 'common-lib-tomeroko3';
import { ObjectId } from 'mongodb';

import {
  ChatRoom,
  chatRoomsCollection,
} from '../configs/mongoDB/initialization';

// Create a new chat room
export const createChatRoom = async (chatRoom: OptionalID<ChatRoom>) => {
  return functionWrapper(async () => {
    const result = await chatRoomsCollection.insertOne(chatRoom);
    return result.insertedId.toString();
  });
};

// Archive a chat room by booking ID
export const archiveChatRoomByBookingID = async (bookingID: string) => {
  return functionWrapper(async () => {
    await chatRoomsCollection.updateOne({ bookingID }, { $set: { isArchived: true } });
  });
};

// Update user profile in chat rooms and messages
export const updateUserProfile = async (userID: string, profile: Partial<UserProfile>) => {
  return functionWrapper(async () => {
    // Update user profiles in chat rooms if necessary
    // For this implementation, we assume that messages store only user IDs
  });
};

// Add a message to a chat room
export const addMessageToChatRoom = async (chatRoomID: string, message: Message) => {
  return functionWrapper(async () => {
    await chatRoomsCollection.updateOne(
      { _id: new ObjectId(chatRoomID) },
      { $push: { messages: message } }
    );
  });
};

// Get a chat room by its ID
export const getChatRoomByID = async (chatRoomID: string) => {
  return functionWrapper(async () => {
    const chatRoom = await chatRoomsCollection.findOne({ _id: new ObjectId(chatRoomID) });
    return chatRoom;
  });
};

// Get chat rooms for a user
export const getChatRoomsForUser = async (userID: string) => {
  return functionWrapper(async () => {
    const chatRooms = await chatRoomsCollection
      .find({ participants: userID, isArchived: { $ne: true } })
      .toArray();
    return chatRooms;
  });
};
