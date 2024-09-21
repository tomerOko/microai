// dal.ts
import { OptionalID, functionWrapper } from 'common-lib-tomeroko3';
import { ObjectId } from 'mongodb';

import {
  Booking,
  AvailabilityBlock,
  bookingsCollection,
  availabilityBlocksCollection,
} from '../configs/mongoDB/initialization';

export const createBooking = async (booking: OptionalID<Booking>) => {
  return functionWrapper(async () => {
    const result = await bookingsCollection.insertOne(booking);
    return result.insertedId.toString();
  });
};

export const getBookingByID = async (ID: string) => {
  return functionWrapper(async () => {
    const booking = await bookingsCollection.findOne({ _id: new ObjectId(ID) });
    return booking;
  });
};

export const updateBookingByID = async (ID: string, update: Partial<Booking>) => {
  return functionWrapper(async () => {
    await bookingsCollection.updateOne({ _id: new ObjectId(ID) }, { $set: update });
  });
};

export const updateAvailabilityBlock = async (block: AvailabilityBlock) => {
  return functionWrapper(async () => {
    await availabilityBlocksCollection.updateOne({ ID: block.ID }, { $set: block }, { upsert: true });
  });
};

export const setAvailabilityBlockStatus = async (blockID: string, status: 'available' | 'full') => {
  return functionWrapper(async () => {
    await availabilityBlocksCollection.updateOne({ ID: blockID }, { $set: { status } });
  });
};

export const getAvailabilityBlockByID = async (ID: string) => {
  return functionWrapper(async () => {
    const block = await availabilityBlocksCollection.findOne({ ID });
    return block;
  });
};
