/**
Business Logic Explanation:

handleBookingCreatedEvent:
When a booking is approved, a chat room is created for the student and consultant to communicate.
The chat room includes the booking ID, participants, creation timestamp, and an empty messages array.

handleBookingCancelledEvent:
When a booking is cancelled, the associated chat room is archived, preventing further messaging.

handleUserUpdatedEvent:
Updates user profile information in chat rooms and messages if the user updates their profile.
 */

import {
  BookingCreatedEventType,
  BookingCancelledEventType,
  UserUpdatedEventType,
} from 'events-tomeroko3';

import * as model from './dal';

// Handle Booking Created Event
export const handleBookingCreatedEvent = async (event: BookingCreatedEventType['data']) => {
  const { bookingID, studentID, consultantID } = event;

  // Create a chat room for the booking
  const chatRoom = {
    bookingID,
    participants: [studentID, consultantID],
    createdAt: new Date().toISOString(),
    messages: [],
    isArchived: false,
  };

  await model.createChatRoom(chatRoom);
};

// Handle Booking Cancelled Event
export const handleBookingCancelledEvent = async (event: BookingCancelledEventType['data']) => {
  const { bookingID } = event;

  // Archive the chat room associated with the booking
  await model.archiveChatRoomByBookingID(bookingID);
};

// Handle User Updated Event
export const handleUserUpdatedEvent = async (event: UserUpdatedEventType['data']) => {
  const { userID, profilePictureUrl, firstName, lastName } = event;

  // Update user profiles in chat rooms and messages if necessary
  await model.updateUserProfile(userID, { profilePictureUrl, firstName, lastName });
};
