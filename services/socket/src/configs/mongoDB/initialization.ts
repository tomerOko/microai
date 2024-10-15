// configs/mongoDB/initialization.ts
import { CollectionInitializerProps, SafeCollection, collectionInitializer, functionWrapper } from 'common-lib-tomeroko3';
import { socketsDbValidations } from 'events-tomeroko3';
import { z } from 'zod';

const { user } = socketsDbValidations;

export type User = z.infer<typeof user>;

const usersInitializerProps: CollectionInitializerProps<User> = {
  collectionName: 'users',
  documentSchema: user,
  indexSpecs: [{ key: { ID: 1 }, unique: true }],
};

export let usersCollection: SafeCollection<User>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    usersCollection = await collectionInitializer(usersInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await usersCollection.deleteMany({});
  });
};