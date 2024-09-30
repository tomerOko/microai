// dal.ts
import { OptionalID, functionWrapper } from 'common-lib-tomeroko3';
import { ObjectId } from 'mongodb';

import {
  Call,
  callsCollection,
} from '../configs/mongoDB/initialization';

// Create a new call
export const createCall = async (call: OptionalID<Call>) => {
  return functionWrapper(async () => {
    const result = await callsCollection.insertOne(call);
    return result.insertedId.toString();
  });
};

// Update call status
export const updateCallStatus = async (callID: string, status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled') => {
  return functionWrapper(async () => {
    await callsCollection.updateOne(
      { _id: new ObjectId(callID) },
      { $set: { status } },
    );
  });
};

// Get call by booking ID
export const getCallByBookingID = async (bookingID: string) => {
  return functionWrapper(async () => {
    const call = await callsCollection.findOne({ bookingID });
    return call;
  });
};

// Delete call by booking ID
export const deleteCallByBookingID = async (bookingID: string) => {
  return functionWrapper(async () => {
    await callsCollection.deleteOne({ bookingID });
  });
};

// Get call by ID
export const getCallByID = async (callID: string) => {
  return functionWrapper(async () => {
    const call = await callsCollection.findOne({ _id: new ObjectId(callID) });
    return call;
  });
};
