// service.ts
import { AppError, functionWrapper } from 'common-lib-tomeroko3';
import {
  AddPaymentMethodRequestType,
  AddPaymentMethodResponseType,
  UpdatePaymentMethodRequestType,
  UpdatePaymentMethodResponseType,
  RemovePaymentMethodRequestType,
  RemovePaymentMethodResponseType,
  AddPayoutMethodRequestType,
  AddPayoutMethodResponseType,
  UpdatePayoutMethodRequestType,
  UpdatePayoutMethodResponseType,
  RemovePayoutMethodRequestType,
  RemovePayoutMethodResponseType,
  PaymentMethodAddedEventType,
  PaymentMethodUpdatedEventType,
  PaymentMethodRemovedEventType,
  PayoutMethodAddedEventType,
  PayoutMethodUpdatedEventType,
  PayoutMethodRemovedEventType,
  PaymentProcessedEventType,
  PaymentFailedEventType,
  ReceiptGeneratedEventType,
  PayoutProcessedEventType,
  PayoutFailedEventType,
  PayoutReceiptGeneratedEventType,
} from 'tomeroko3-events';

import {
  paymentMethodAddedPublisher,
  paymentMethodUpdatedPublisher,
  paymentMethodRemovedPublisher,
  payoutMethodAddedPublisher,
  payoutMethodUpdatedPublisher,
  payoutMethodRemovedPublisher,
  paymentProcessedPublisher,
  paymentFailedPublisher,
  receiptGeneratedPublisher,
  payoutProcessedPublisher,
  payoutFailedPublisher,
  payoutReceiptGeneratedPublisher,
} from './configs/rabbitMQ/initialization';

import * as model from './dal';
import { processPaymentWithProvider } from './utils/paymentProvider';
import { processPayoutWithProvider } from './utils/payoutProcessor';
import { generateReceipt } from './utils/receiptGenerator';
import { uploadToS3 } from './utils/s3Uploader';
import { appErrorCodes } from './appErrorCodes';

export const addPaymentMethod = async (
  userID: string,
  props: AddPaymentMethodRequestType['body']
): Promise<AddPaymentMethodResponseType> => {
  return functionWrapper(async () => {
    // Validate and securely store the payment method
    await model.addPaymentMethod(userID, props);

    // Publish PAYMENT_METHOD_ADDED event
    const eventData: PaymentMethodAddedEventType['data'] = {
      userID,
      paymentMethodID: 'new_payment_method_id', // Replace with actual ID
    };
    paymentMethodAddedPublisher(eventData);

    return {};
  });
};

export const updatePaymentMethod = async (
  userID: string,
  props: UpdatePaymentMethodRequestType['body']
): Promise<UpdatePaymentMethodResponseType> => {
  return functionWrapper(async () => {
    const { paymentMethodID, updates } = props;

    // Update the payment method securely
    await model.updatePaymentMethod(userID, paymentMethodID, updates);

    // Publish PAYMENT_METHOD_UPDATED event
    const eventData: PaymentMethodUpdatedEventType['data'] = {
      userID,
      paymentMethodID,
    };
    paymentMethodUpdatedPublisher(eventData);

    return {};
  });
};

export const removePaymentMethod = async (
  userID: string,
  props: RemovePaymentMethodRequestType['body']
): Promise<RemovePaymentMethodResponseType> => {
  return functionWrapper(async () => {
    const { paymentMethodID } = props;

    // Remove the payment method
    await model.removePaymentMethod(userID, paymentMethodID);

    // Publish PAYMENT_METHOD_REMOVED event
    const eventData: PaymentMethodRemovedEventType['data'] = {
      userID,
      paymentMethodID,
    };
    paymentMethodRemovedPublisher(eventData);

    return {};
  });
};

export const addPayoutMethod = async (
  consultantID: string,
  props: AddPayoutMethodRequestType['body']
): Promise<AddPayoutMethodResponseType> => {
  return functionWrapper(async () => {
    // Validate and securely store the payout method
    await model.addPayoutMethod(consultantID, props);

    // Publish PAYOUT_METHOD_ADDED event
    const eventData: PayoutMethodAddedEventType['data'] = {
      consultantID,
      payoutMethodID: 'new_payout_method_id', // Replace with actual ID
    };
    payoutMethodAddedPublisher(eventData);

    return {};
  });
};

export const updatePayoutMethod = async (
  consultantID: string,
  props: UpdatePayoutMethodRequestType['body']
): Promise<UpdatePayoutMethodResponseType> => {
  return functionWrapper(async () => {
    const { payoutMethodID, updates } = props;

    // Update the payout method securely
    await model.updatePayoutMethod(consultantID, payoutMethodID, updates);

    // Publish PAYOUT_METHOD_UPDATED event
    const eventData: PayoutMethodUpdatedEventType['data'] = {
      consultantID,
      payoutMethodID,
    };
    payoutMethodUpdatedPublisher(eventData);

    return {};
  });
};

export const removePayoutMethod = async (
  consultantID: string,
  props: RemovePayoutMethodRequestType['body']
): Promise<RemovePayoutMethodResponseType> => {
  return functionWrapper(async () => {
    const { payoutMethodID } = props;

    // Remove the payout method
    await model.removePayoutMethod(consultantID, payoutMethodID);

    // Publish PAYOUT_METHOD_REMOVED event
    const eventData: PayoutMethodRemovedEventType['data'] = {
      consultantID,
      payoutMethodID,
    };
    payoutMethodRemovedPublisher(eventData);

    return {};
  });
};

export const processPayment = async (bookingID: string) => {
  return functionWrapper(async () => {
    // Retrieve necessary data (studentID, consultantID, amount)
    const amountDue = await calculateAmountDue(bookingID);
    const studentID = await getStudentIDByBooking(bookingID);
    const consultantID = await getConsultantIDByBooking(bookingID);
    const paymentMethods = await model.getPaymentMethodsByUserID(studentID);

    if (paymentMethods.length === 0) {
      paymentFailedPublisher({ bookingID, studentID, reason: 'No payment method on file' });
      return;
    }

    const paymentMethod = paymentMethods[0]; // Use the first payment method

    // Process payment via third-party provider
    const paymentResult = await processPaymentWithProvider(amountDue, paymentMethod);

    if (paymentResult.success) {
      // Generate and upload receipt
      const receipt = generateReceipt({ bookingID, amount: amountDue, studentID });
      const receiptURL = await uploadToS3(receipt);

      // Create payment record
      await model.createPaymentRecord({
        bookingID,
        studentID,
        consultantID,
        amount: amountDue,
        status: 'processed',
        receiptURL,
        createdAt: new Date().toISOString(),
      });

      // Publish events
      const paymentProcessedData: PaymentProcessedEventType['data'] = {
        bookingID,
        studentID,
        receiptURL,
      };
      paymentProcessedPublisher(paymentProcessedData);

      const receiptGeneratedData: ReceiptGeneratedEventType['data'] = {
        bookingID,
        receiptURL,
      };
      receiptGeneratedPublisher(receiptGeneratedData);
    } else {
      const paymentFailedData: PaymentFailedEventType['data'] = {
        bookingID,
        studentID,
        reason: paymentResult.error || 'Payment failed',
      };
      paymentFailedPublisher(paymentFailedData);
    }
  });
};

export const processMonthlyPayouts = async () => {
  return functionWrapper(async () => {
    // Get all consultants
    const consultants = await model.getAllConsultants();

    for (const consultant of consultants) {
      try {
        // Calculate total earnings
        const totalEarnings = await model.calculateMonthlyEarnings(consultant.ID);

        if (totalEarnings <= 0) continue;

        // Get payout method
        const payoutMethods = await model.getPayoutMethodsByConsultantID(consultant.ID);
        if (payoutMethods.length === 0) {
          const payoutFailedData: PayoutFailedEventType['data'] = {
            consultantID: consultant.ID,
            amount: totalEarnings,
            reason: 'No payout method on file',
          };
          payoutFailedPublisher(payoutFailedData);
          continue;
        }

        const payoutMethod = payoutMethods[0];

        // Process payout
        const payoutResult = await processPayoutWithProvider(totalEarnings, payoutMethod);

        if (payoutResult.success) {
          // Generate and upload receipt
          const receipt = generateReceipt({
            consultantID: consultant.ID,
            amount: totalEarnings,
            period: getLastMonthPeriod(),
          });
          const receiptURL = await uploadToS3(receipt);

          // Create payout record
          await model.createPayoutRecord({
            consultantID: consultant.ID,
            amount: totalEarnings,
            status: 'processed',
            receiptURL,
            createdAt: new Date().toISOString(),
          });

          // Publish events
          const payoutProcessedData: PayoutProcessedEventType['data'] = {
            consultantID: consultant.ID,
            amount: totalEarnings,
            receiptURL,
          };
          payoutProcessedPublisher(payoutProcessedData);

          const payoutReceiptGeneratedData: PayoutReceiptGeneratedEventType['data'] = {
            consultantID: consultant.ID,
            receiptURL,
          };
          payoutReceiptGeneratedPublisher(payoutReceiptGeneratedData);
        } else {
          const payoutFailedData: PayoutFailedEventType['data'] = {
            consultantID: consultant.ID,
            amount: totalEarnings,
            reason: payoutResult.error || 'Payout failed',
          };
          payoutFailedPublisher(payoutFailedData);
        }
      } catch (error) {
        const payoutFailedData: PayoutFailedEventType['data'] = {
          consultantID: consultant.ID,
          amount: 0,
          reason: error.message,
        };
        payoutFailedPublisher(payoutFailedData);
      }
    }
  });
};

// Helper functions
async function calculateAmountDue(bookingID: string): Promise<number> {
  // Implement logic to calculate amount based on booking details
  return 5000; // Example amount in cents
}

async function getStudentIDByBooking(bookingID: string): Promise<string> {
  // Implement logic to retrieve student ID associated with the booking
  return 'student_id';
}

async function getConsultantIDByBooking(bookingID: string): Promise<string> {
  // Implement logic to retrieve consultant ID associated with the booking
  return 'consultant_id';
}

function getLastMonthPeriod(): string {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return `${lastMonth.toISOString().slice(0, 7)}`; // YYYY-MM
}
