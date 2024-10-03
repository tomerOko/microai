// utils/eventHandlerFactory.ts

import {
  userEventsNames,
  bookingEventsNames,
  callEventsNames,
  paymentEventsNames,
  ratingEventsNames,
  authEventsNames,
  chatEventsNames,
  notificationEventsNames,
  consultantEventsNames,
  scheduleEventsNames,
  searchEventsNames,
} from '../events';

import { processNotification } from '../service';

class UserCreatedEventHandler {
  async handle(eventData: any) {
    const { userID, name } = eventData;

    // Schedule welcome email for the next day
    const sendTime = new Date();
    sendTime.setDate(sendTime.getDate() + 1);

    await processNotification(
      userID,
      userEventsNames.USER_CREATED,
      { name },
      'scheduled',
      sendTime
    );
  }
}

class BookingRequestedEventHandler {
  async handle(eventData: any) {
    const { consultantID, studentName } = eventData;

    await processNotification(
      consultantID,
      bookingEventsNames.BOOKING_REQUESTED,
      { studentName },
      'immediate'
    );
  }
}

class BookingApprovedEventHandler {
  async handle(eventData: any) {
    const { studentID, consultantName } = eventData;

    await processNotification(
      studentID,
      bookingEventsNames.BOOKING_APPROVED,
      { consultantName },
      'immediate'
    );
  }
}

class BookingRejectedEventHandler {
  async handle(eventData: any) {
    const { studentID } = eventData;

    await processNotification(
      studentID,
      bookingEventsNames.BOOKING_REJECTED,
      {},
      'immediate'
    );
  }
}

class CallEndedEventHandler {
  async handle(eventData: any) {
    const { studentID, consultantName } = eventData;

    // Schedule review request email 1 hour after call ends
    const sendTime = new Date();
    sendTime.setHours(sendTime.getHours() + 1);

    await processNotification(
      studentID,
      callEventsNames.CALL_ENDED,
      { consultantName },
      'scheduled',
      sendTime
    );
  }
}

class PaymentFailedEventHandler {
  async handle(eventData: any) {
    const { studentID, bookingID } = eventData;

    await processNotification(
      studentID,
      paymentEventsNames.PAYMENT_FAILED,
      { bookingID },
      'immediate'
    );
  }
}

class PayoutProcessedEventHandler {
  async handle(eventData: any) {
    const { consultantID, amount } = eventData;

    await processNotification(
      consultantID,
      paymentEventsNames.PAYOUT_PROCESSED,
      { amount },
      'immediate'
    );
  }
}

class ReviewSubmittedEventHandler {
  async handle(eventData: any) {
    const { consultantID, studentName } = eventData;

    await processNotification(
      consultantID,
      ratingEventsNames.REVIEW_SUBMITTED,
      { studentName },
      'immediate'
    );
  }
}

class AuthFailureEventHandler {
  async handle(eventData: any) {
    const { userID } = eventData;

    // Check if threshold of failed attempts is met (placeholder logic)
    const failedAttempts = await this.getFailedAttempts(userID);

    if (failedAttempts >= 5) {
      // Send notification immediately
      await processNotification(
        userID,
        authEventsNames.AUTH_FAILURE,
        {},
        'immediate'
      );
    }
  }

  async getFailedAttempts(userID: string): Promise<number> {
    // Placeholder: Implement logic to retrieve number of failed attempts
    return 5;
  }
}

class MessageSentEventHandler {
  async handle(eventData: any) {
    const { recipientID, senderName } = eventData;

    // Check if recipient is offline (placeholder logic)
    const isRecipientOnline = await this.checkUserOnlineStatus(recipientID);

    if (!isRecipientOnline) {
      await processNotification(
        recipientID,
        chatEventsNames.MESSAGE_SENT,
        { senderName },
        'immediate'
      );
    }
  }

  async checkUserOnlineStatus(userID: string): Promise<boolean> {
    // Placeholder: Implement logic to check if user is online
    return false;
  }
}

class DeliveryFailedEventHandler {
  async handle(eventData: any) {
    const { userID } = eventData;

    await processNotification(
      userID,
      notificationEventsNames.DELIVERY_FAILED,
      {},
      'immediate'
    );
  }
}

class BookingCancelledEventHandler {
  async handle(eventData: any) {
    const { studentID, consultantID } = eventData;

    // Notify Student
    await processNotification(
      studentID,
      bookingEventsNames.BOOKING_CANCELLED,
      {},
      'immediate'
    );

    // Notify Consultant
    await processNotification(
      consultantID,
      bookingEventsNames.BOOKING_CANCELLED,
      {},
      'immediate'
    );
  }
}

class CallStartedEventHandler {
  async handle(eventData: any) {
    const { studentID, consultantID } = eventData;

    // Notify Student
    await processNotification(
      studentID,
      callEventsNames.CALL_STARTED,
      {},
      'immediate'
    );

    // Notify Consultant
    await processNotification(
      consultantID,
      callEventsNames.CALL_STARTED,
      {},
      'immediate'
    );
  }
}

class NewPasswordSetEventHandler {
  async handle(eventData: any) {
    const { userID } = eventData;

    await processNotification(
      userID,
      authEventsNames.NEW_PASSWORD_SET,
      {},
      'immediate'
    );
  }
}

class ConsultantOnboardedEventHandler {
  async handle(eventData: any) {
    const { consultantID, name } = eventData;

    // Schedule welcome email for the next day
    const sendTime = new Date();
    sendTime.setDate(sendTime.getDate() + 1);

    await processNotification(
      consultantID,
      consultantEventsNames.CONSULTANT_ONBOARDED,
      { name },
      'scheduled',
      sendTime
    );
  }
}

class PaymentProcessedEventHandler {
  async handle(eventData: any) {
    const { studentID, amount } = eventData;

    await processNotification(
      studentID,
      paymentEventsNames.PAYMENT_PROCESSED,
      { amount },
      'immediate'
    );
  }
}

class PayoutFailedEventHandler {
  async handle(eventData: any) {
    const { consultantID, amount } = eventData;

    await processNotification(
      consultantID,
      paymentEventsNames.PAYOUT_FAILED,
      { amount },
      'immediate'
    );
  }
}

class TopicAddedEventHandler {
  async handle(eventData: any) {
    const { consultantID, topicName } = eventData;

    await processNotification(
      consultantID,
      consultantEventsNames.TOPIC_ADDED,
      { topicName },
      'immediate'
    );
  }
}

class WeeklyScheduleUpdatedEventHandler {
  async handle(eventData: any) {
    const { consultantID, scheduleSummary } = eventData;

    // Schedule notification for next Sunday at 6 PM
    const sendTime = new Date();
    const dayOfWeek = sendTime.getDay();
    const daysUntilSunday = (7 - dayOfWeek) % 7;
    sendTime.setDate(sendTime.getDate() + daysUntilSunday);
    sendTime.setHours(18, 0, 0, 0); // At 6 PM

    await processNotification(
      consultantID,
      scheduleEventsNames.WEEKLY_SCHEDULE_UPDATED,
      { scheduleSummary },
      'scheduled',
      sendTime
    );
  }
}

class RecommendationsGeneratedEventHandler {
  async handle(eventData: any) {
    const { userID } = eventData;

    await processNotification(
      userID,
      searchEventsNames.RECOMMENDATIONS_GENERATED,
      {},
      'immediate'
    );
  }
}

export class EventHandlerFactory {
  static getHandler(eventType: string): any {
    switch (eventType) {
      case userEventsNames.USER_CREATED:
        return new UserCreatedEventHandler();
      case bookingEventsNames.BOOKING_REQUESTED:
        return new BookingRequestedEventHandler();
      case bookingEventsNames.BOOKING_APPROVED:
        return new BookingApprovedEventHandler();
      case bookingEventsNames.BOOKING_REJECTED:
        return new BookingRejectedEventHandler();
      case callEventsNames.CALL_ENDED:
        return new CallEndedEventHandler();
      case paymentEventsNames.PAYMENT_FAILED:
        return new PaymentFailedEventHandler();
      case paymentEventsNames.PAYOUT_PROCESSED:
        return new PayoutProcessedEventHandler();
      case ratingEventsNames.REVIEW_SUBMITTED:
        return new ReviewSubmittedEventHandler();
      case authEventsNames.AUTH_FAILURE:
        return new AuthFailureEventHandler();
      case chatEventsNames.MESSAGE_SENT:
        return new MessageSentEventHandler();
      case notificationEventsNames.DELIVERY_FAILED:
        return new DeliveryFailedEventHandler();
      case bookingEventsNames.BOOKING_CANCELLED:
        return new BookingCancelledEventHandler();
      case callEventsNames.CALL_STARTED:
        return new CallStartedEventHandler();
      case authEventsNames.NEW_PASSWORD_SET:
        return new NewPasswordSetEventHandler();
      case consultantEventsNames.CONSULTANT_ONBOARDED:
        return new ConsultantOnboardedEventHandler();
      case paymentEventsNames.PAYMENT_PROCESSED:
        return new PaymentProcessedEventHandler();
      case paymentEventsNames.PAYOUT_FAILED:
        return new PayoutFailedEventHandler();
      case consultantEventsNames.TOPIC_ADDED:
        return new TopicAddedEventHandler();
      case scheduleEventsNames.WEEKLY_SCHEDULE_UPDATED:
        return new WeeklyScheduleUpdatedEventHandler();
      case searchEventsNames.RECOMMENDATIONS_GENERATED:
        return new RecommendationsGeneratedEventHandler();
      default:
        throw new Error(`No handler found for event type: ${eventType}`);
    }
  }
}
