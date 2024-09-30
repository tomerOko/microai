// configs/mongoDB/initialization.ts
import {
  CollectionInitializerProps,
  SafeCollection,
  collectionInitializer,
  functionWrapper,
} from 'common-lib-tomeroko3';
import { bookingsDbValidations } from 'events-tomeroko3';
import { z } from 'zod';

const { booking, availabilityBlock } = bookingsDbValidations;

export type Booking = z.infer<typeof booking>;
export type AvailabilityBlock = z.infer<typeof availabilityBlock>;

const bookingsInitializerProps: CollectionInitializerProps<Booking> = {
  collectionName: 'bookings',
  documentSchema: booking,
  indexSpecs: [{ key: { bookingID: 1 }, unique: true }],
};

const availabilityBlocksInitializerProps: CollectionInitializerProps<AvailabilityBlock> = {
  collectionName: 'availabilityBlocks',
  documentSchema: availabilityBlock,
  indexSpecs: [{ key: { ID: 1 }, unique: true }],
};

export let bookingsCollection: SafeCollection<Booking>;
export let availabilityBlocksCollection: SafeCollection<AvailabilityBlock>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    bookingsCollection = await collectionInitializer(bookingsInitializerProps);
    availabilityBlocksCollection = await collectionInitializer(availabilityBlocksInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await bookingsCollection.deleteMany({});
    await availabilityBlocksCollection.deleteMany({});
  });
};
