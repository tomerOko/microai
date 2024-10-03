// dal.ts
import { functionWrapper } from 'common-lib-tomeroko3';
import { ObjectId } from 'mongodb';
import {
  PaymentMethod,
  PayoutMethod,
  PaymentRecord,
  PayoutRecord,
  paymentMethodsCollection,
  payoutMethodsCollection,
  paymentRecordsCollection,
  payoutRecordsCollection,
  consultantsCollection,
} from './configs/mongoDB/initialization';

// Securely store the payment method for a user
export const addPaymentMethod = async (userID: string, paymentMethod: PaymentMethod) => {
  return functionWrapper(async () => {
    // Encrypt sensitive payment information before storing
    const encryptedPaymentMethod = {
      ...paymentMethod,
      cardNumber: 'encrypted_card_number',
    };
    await paymentMethodsCollection.insertOne({
      userID,
      ...encryptedPaymentMethod,
    });
  });
};

// Update a user's payment method
export const updatePaymentMethod = async (
  userID: string,
  paymentMethodID: string,
  updates: Partial<PaymentMethod>
) => {
  return functionWrapper(async () => {
    // Encrypt sensitive payment information before updating
    const encryptedUpdates = {
      ...updates,
      cardNumber: updates.cardNumber ? 'encrypted_card_number' : undefined,
    };
    await paymentMethodsCollection.updateOne(
      { _id: new ObjectId(paymentMethodID), userID },
      { $set: encryptedUpdates }
    );
  });
};

// Remove a user's payment method
export const removePaymentMethod = async (userID: string, paymentMethodID: string) => {
  return functionWrapper(async () => {
    await paymentMethodsCollection.deleteOne({ _id: new ObjectId(paymentMethodID), userID });
  });
};

// Securely store the payout method for a consultant
export const addPayoutMethod = async (consultantID: string, payoutMethod: PayoutMethod) => {
  return functionWrapper(async () => {
    // Encrypt sensitive payout information before storing
    const encryptedPayoutMethod = {
      ...payoutMethod,
      accountNumber: 'encrypted_account_number',
    };
    await payoutMethodsCollection.insertOne({
      consultantID,
      ...encryptedPayoutMethod,
    });
  });
};

// Update a consultant's payout method
export const updatePayoutMethod = async (
  consultantID: string,
  payoutMethodID: string,
  updates: Partial<PayoutMethod>
) => {
  return functionWrapper(async () => {
    // Encrypt sensitive payout information before updating
    const encryptedUpdates = {
      ...updates,
      accountNumber: updates.accountNumber ? 'encrypted_account_number' : undefined,
    };
    await payoutMethodsCollection.updateOne(
      { _id: new ObjectId(payoutMethodID), consultantID },
      { $set: encryptedUpdates }
    );
  });
};

// Remove a consultant's payout method
export const removePayoutMethod = async (consultantID: string, payoutMethodID: string) => {
  return functionWrapper(async () => {
    await payoutMethodsCollection.deleteOne({ _id: new ObjectId(payoutMethodID), consultantID });
  });
};

// Create a payment record after processing a payment
export const createPaymentRecord = async (paymentRecord: PaymentRecord) => {
  return functionWrapper(async () => {
    await paymentRecordsCollection.insertOne(paymentRecord);
  });
};

// Create a payout record after processing a payout
export const createPayoutRecord = async (payoutRecord: PayoutRecord) => {
  return functionWrapper(async () => {
    await payoutRecordsCollection.insertOne(payoutRecord);
  });
};

// Retrieve all consultants
export const getAllConsultants = async () => {
  return functionWrapper(async () => {
    const consultants = await consultantsCollection.find({}).toArray();
    return consultants;
  });
};

// Calculate monthly earnings for a consultant
export const calculateMonthlyEarnings = async (consultantID: string): Promise<number> => {
  return functionWrapper(async () => {
    const lastMonthPeriod = getLastMonthPeriod();

    const payments = await paymentRecordsCollection
      .find({
        consultantID,
        status: 'processed',
        createdAt: {
          $gte: new Date(`${lastMonthPeriod}-01T00:00:00Z`),
          $lt: new Date(`${lastMonthPeriod}-31T23:59:59Z`),
        },
      })
      .toArray();

    const totalEarnings = payments.reduce((sum, payment) => sum + payment.amount, 0);

    return totalEarnings;
  });
};

// Retrieve payment methods for a user
export const getPaymentMethodsByUserID = async (userID: string) => {
  return functionWrapper(async () => {
    const paymentMethods = await paymentMethodsCollection.find({ userID }).toArray();
    // Decrypt sensitive information before returning
    return paymentMethods.map((method) => ({
      ...method,
      cardNumber: 'decrypted_card_number',
    }));
  });
};

// Retrieve payout methods for a consultant
export const getPayoutMethodsByConsultantID = async (consultantID: string) => {
  return functionWrapper(async () => {
    const payoutMethods = await payoutMethodsCollection.find({ consultantID }).toArray();
    // Decrypt sensitive information before returning
    return payoutMethods.map((method) => ({
      ...method,
      accountNumber: 'decrypted_account_number',
    }));
  });
};

// Helper function to get the last month's period
function getLastMonthPeriod(): string {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return `${lastMonth.toISOString().slice(0, 7)}`; // YYYY-MM
}
