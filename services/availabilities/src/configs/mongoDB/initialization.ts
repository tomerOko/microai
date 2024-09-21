// configs/mongoDB/initialization.ts
import {
  CollectionInitializerProps,
  SafeCollection,
  collectionInitializer,
  functionWrapper,
} from 'common-lib-tomeroko3';
import { availabilitiesDbValidations } from 'events-tomeroko3';
import { z } from 'zod';

const { availabilityBlock, consultantAvailability } = availabilitiesDbValidations;

export type AvailabilityBlock = z.infer<typeof availabilityBlock>;
export type ConsultantAvailability = z.infer<typeof consultantAvailability>;

const availabilityBlocksInitializerProps: CollectionInitializerProps<AvailabilityBlock> = {
  collectionName: 'availabilityBlocks',
  documentSchema: availabilityBlock,
  indexSpecs: [{ key: { consultantID: 1, date: 1 }, unique: true }],
};

const consultantAvailabilitiesInitializerProps: CollectionInitializerProps<ConsultantAvailability> = {
  collectionName: 'consultantAvailabilities',
  documentSchema: consultantAvailability,
  indexSpecs: [{ key: { consultantID: 1 }, unique: true }],
};

export let availabilityBlocksCollection: SafeCollection<AvailabilityBlock>;
export let consultantAvailabilitiesCollection: SafeCollection<ConsultantAvailability>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    availabilityBlocksCollection = await collectionInitializer(availabilityBlocksInitializerProps);
    consultantAvailabilitiesCollection = await collectionInitializer(
      consultantAvailabilitiesInitializerProps,
    );
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await availabilityBlocksCollection.deleteMany({});
    await consultantAvailabilitiesCollection.deleteMany({});
  });
};
