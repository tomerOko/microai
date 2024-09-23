/**
 * Business Logic Explanation:

Booking Events: When booking-related events occur, the service sends notifications to the relevant users to inform them of the changes.
Message Events: When a message is sent, the service notifies the recipient(s) that they have a new message.
Consultant Onboarding: When a new consultant is onboarded, they receive a welcome notification.
 */

import {
  BookingRequestedEventType,
  BookingApprovedEventType,
  BookingRejectedEventType,
  BookingCancelledEventType,
  BookingRescheduledEventType,
  MessageSentEventType,
  ConsultantOnboardedEventType,
} from 'events-tomeroko3';

import * as service from './service';

// Handle Booking Requested Event
export const handleBookingRequestedEvent = async (event: BookingRequestedEventType['data']) => {
  // Notify the consultant that a booking request has been made
  await service.sendNotification({
    userID: event.consultantID,
    type: 'BOOKING_REQUESTED',
    data: {
      bookingID: event.bookingID,
      studentID: event.studentID,
    },
  });
};

// Handle Booking Approved Event
export const handleBookingApprovedEvent = async (event: BookingApprovedEventType['data']) => {
  // Notify the student that the booking has been approved
  await service.sendNotification({
    userID: event.studentID,
    type: 'BOOKING_APPROVED',
    data: {
      bookingID: event.bookingID,
      consultantID: event.consultantID,
    },
  });
};

// Handle Booking Rejected Event
export const handleBookingRejectedEvent = async (event: BookingRejectedEventType['data']) => {
  // Notify the student that the booking has been rejected
  await service.sendNotification({
    userID: event.studentID,
    type: 'BOOKING_REJECTED',
    data: {
      bookingID: event.bookingID,
      consultantID: event.consultantID,
    },
  });
};

// Handle Booking Cancelled Event
export const handleBookingCancelledEvent = async (event: BookingCancelledEventType['data']) => {
  // Notify both the student and consultant that the booking has been cancelled
  await service.sendNotification({
    userID: event.studentID,
    type: 'BOOKING_CANCELLED',
    data: {
      bookingID: event.bookingID,
      otherPartyID: event.consultantID,
    },
  });
  await service.sendNotification({
    userID: event.consultantID,
    type: 'BOOKING_CANCELLED',
    data: {
      bookingID: event.bookingID,
      otherPartyID: event.studentID,
    },
  });
};

// Handle Booking Rescheduled Event
export const handleBookingRescheduledEvent = async (event: BookingRescheduledEventType['data']) => {
  // Notify both parties that the booking has been rescheduled
  await service.sendNotification({
    userID: event.studentID,
    type: 'BOOKING_RESCHEDULED',
    data: {
      bookingID: event.bookingID,
      newAvailabilityBlockID: event.availabilityBlockID,
    },
  });
  await service.sendNotification({
    userID: event.consultantID,
    type: 'BOOKING_RESCHEDULED',
    data: {
      bookingID: event.bookingID,
      newAvailabilityBlockID: event.availabilityBlockID,
    },
  });
};

// Handle Message Sent Event
export const handleMessageSentEvent = async (event: MessageSentEventType['data']) => {
  // Notify the recipient that a new message has been received
  const { chatRoomID, message } = event;
  const chatRoom = await service.getChatRoomByID(chatRoomID);
  if (chatRoom) {
    const recipientIDs = chatRoom.participants.filter((id) => id !== message.senderID);
    for (const recipientID of recipientIDs) {
      await service.sendNotification({
        userID: recipientID,
        type: 'NEW_MESSAGE',
        data: {
          chatRoomID,
          message,
        },
      });
    }
  }
};

// Handle Consultant Onboarded Event
export const handleConsultantOnboardedEvent = async (event: ConsultantOnboardedEventType['data']) => {
  // Send a welcome notification to the new consultant
  await service.sendNotification({
    userID: event.ID,
    type: 'WELCOME_CONSULTANT',
    data: {
      firstName: event.firstName,
    },
  });
};
