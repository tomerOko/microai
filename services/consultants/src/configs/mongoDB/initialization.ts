// configs/mongoDB/initialization.ts
import {
  CollectionInitializerProps,
  SafeCollection,
  collectionInitializer,
  functionWrapper,
} from 'common-lib-tomeroko3';
import { consultantDbValidations } from 'events-tomeroko3';
import { z } from 'zod';

const { consultant, user, topic } = consultantDbValidations;

export type User = z.infer<typeof user>;
export type Consultant = z.infer<typeof consultant>;
export type Topic = z.infer<typeof topic>;

const usersInitializerProps: CollectionInitializerProps<User> = {
  collectionName: 'users',
  documentSchema: user,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};

const consultantsInitializerProps: CollectionInitializerProps<Consultant> = {
  collectionName: 'consultants',
  documentSchema: consultant,
  indexSpecs: [
    { key: { email: 1 }, unique: true },
    { key: { userID: 1 }, unique: true },
  ],
};

const topicsInitializerProps: CollectionInitializerProps<Topic> = {
  collectionName: 'topics',
  documentSchema: topic,
  indexSpecs: [
    { key: { name: 1 } },
    { key: { consultantID: 1 } },
  ],
};

export let usersCollection: SafeCollection<User>;
export let consultantsCollection: SafeCollection<Consultant>;
export let topicsCollection: SafeCollection<Topic>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    usersCollection = await collectionInitializer(usersInitializerProps);
    consultantsCollection = await collectionInitializer(consultantsInitializerProps);
    topicsCollection = await collectionInitializer(topicsInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await usersCollection.deleteMany({});
    await consultantsCollection.deleteMany({});
    await topicsCollection.deleteMany({});
  });
};
