// initialization.ts
import { CollectionInitializerProps, SafeCollection, collectionInitializer, functionWrapper } from 'common-lib-tomeroko3';
import { signupDbValidations } from 'events-tomeroko3';
import { z } from 'zod';

const { user, pincode } = signupDbValidations;

export type User = z.infer<typeof user>;
export type Pincode = z.infer<typeof pincode>;

const usersInitializerProps: CollectionInitializerProps<User> = {
  collectionName: 'users',
  documentSchema: user,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};

const pincodesInitializerProps: CollectionInitializerProps<Pincode> = {
  collectionName: 'pincodes',
  documentSchema: pincode,
  indexSpecs: [{ key: { email: 1 }, unique: true }],
};

export let usersCollection: SafeCollection<User>;
export let pincodesCollection: SafeCollection<Pincode>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    usersCollection = await collectionInitializer(usersInitializerProps);
    pincodesCollection = await collectionInitializer(pincodesInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await usersCollection.deleteMany({});
    await pincodesCollection.deleteMany({});
  });
};
