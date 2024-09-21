// dal.ts
import { OptionalID, functionWrapper } from 'common-lib-tomeroko3';

import { User, usersCollection } from '../configs/mongoDB/initialization';

export const createUser = async (user: OptionalID<User>) => {
  return functionWrapper(async () => {
    const ID = await usersCollection.insertOne(user);
    return ID;
  });
};

export const getUserByEmail = async (email: string) => {
  return functionWrapper(async () => {
    const user = await usersCollection.findOne({ email });
    return user;
  });
};

export const getUserByID = async (ID: string) => {
  return functionWrapper(async () => {
    const user = await usersCollection.findOne({ ID });
    return user;
  });
};

export const getUserByOAuthProviderID = async (provider: string, providerID: string) => {
  return functionWrapper(async () => {
    const user = await usersCollection.findOne({
      'oauthProviders.provider': provider,
      'oauthProviders.providerID': providerID,
    });
    return user;
  });
};

export const updateUserByID = async (ID: string, update: Partial<User>) => {
  return functionWrapper(async () => {
    await usersCollection.updateOne({ ID }, { $set: update });
  });
};
