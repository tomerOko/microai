// configs/mongoDB/initialization.ts
import {
  CollectionInitializerProps,
  SafeCollection,
  collectionInitializer,
  functionWrapper,
} from 'common-lib-tomeroko3';
import { callsDbValidations } from 'events-tomeroko3';
import { z } from 'zod';

const { call } = callsDbValidations;

export type Call = z.infer<typeof call>;

const callsInitializerProps: CollectionInitializerProps<Call> = {
  collectionName: 'calls',
  documentSchema: call,
  indexSpecs: [{ key: { bookingID: 1 }, unique: true }],
};

export let callsCollection: SafeCollection<Call>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    callsCollection = await collectionInitializer(callsInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await callsCollection.deleteMany({});
  });
};
