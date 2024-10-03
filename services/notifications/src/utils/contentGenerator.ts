// utils/contentGenerator.ts

export class NotificationContentGenerator {
  static generateContent(eventType: string, eventData: any): string {
    switch (eventType) {
      case 'USER_CREATED':
        return `Welcome ${eventData.name}! Thank you for joining our platform.`;
      case 'BOOKING_REQUESTED':
        return `You have a new booking request from ${eventData.studentName}. Please review and respond.`;
      case 'BOOKING_APPROVED':
        return `Your booking with ${eventData.consultantName} has been approved. See you soon!`;
      case 'BOOKING_REJECTED':
        return `We're sorry to inform you that your booking was rejected. Please try another time.`;
      case 'CALL_ENDED':
        return `Hope you enjoyed your call with ${eventData.consultantName}. Please leave a review.`;
      case 'PAYMENT_FAILED':
        return `Your payment for booking ${eventData.bookingID} has failed. Please update your payment method.`;
      case 'PAYOUT_PROCESSED':
        return `Your payout of $${(eventData.amount / 100).toFixed(2)} has been processed. Check your account.`;
      case 'REVIEW_SUBMITTED':
        return `You have received a new review from ${eventData.studentName}. Check it out!`;
      case 'AUTH_FAILURE':
        return `We've detected multiple failed login attempts on your account. If this wasn't you, please reset your password.`;
      case 'MESSAGE_SENT':
        return `You have a new message from ${eventData.senderName}. Log in to read it.`;
      case 'DELIVERY_FAILED':
        return `We couldn't deliver a recent notification to you. Please check your contact information in your profile settings.`;
      case 'BOOKING_CANCELLED':
        return `Your booking has been cancelled. If you have any questions, please contact support.`;
      case 'CALL_STARTED':
        return `Your call is starting now. Please join promptly.`;
      case 'NEW_PASSWORD_SET':
        return `Your password has been changed successfully. If you did not make this change, please contact support immediately.`;
      case 'CONSULTANT_ONBOARDED':
        return `Welcome ${eventData.name}! Thank you for becoming a consultant on our platform. Here are some tips to get started.`;
      case 'PAYMENT_PROCESSED':
        return `Your payment of $${(eventData.amount / 100).toFixed(2)} was processed successfully. Thank you!`;
      case 'PAYOUT_FAILED':
        return `Your payout of $${(eventData.amount / 100).toFixed(2)} failed. Please update your payout method.`;
      case 'TOPIC_ADDED':
        return `Your new topic "${eventData.topicName}" is now live. Check your profile to see how it looks.`;
      case 'WEEKLY_SCHEDULE_UPDATED':
        return `Here's your schedule for the upcoming week: ${eventData.scheduleSummary}`;
      case 'RECOMMENDATIONS_GENERATED':
        return `We've found new consultant recommendations for you based on your interests. Check them out!`;
      default:
        return 'You have a new notification.';
    }
  }
}
