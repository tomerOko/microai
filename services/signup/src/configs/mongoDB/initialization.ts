// dal.ts
import { OptionalID, functionWrapper } from 'common-lib-tomeroko3';

import { User, Pincode, usersCollection, pincodesCollection } from '../configs/mongoDB/initialization';

export const createUser = async (user: OptionalID<User>) => {
  return functionWrapper(async () => {
    const result = await usersCollection.insertOne(user);
    return result.insertedId.toString();
  });
};

export const getUserByID = async (ID: string) => {
  return functionWrapper(async () => {
    const user = await usersCollection.findOne({ ID });
    return user;
  });
};

export const getUserByEmail = async (email: string) => {
  return functionWrapper(async () => {
    const user = await usersCollection.findOne({ email });
    return user;
  });
};

export const updateUserByID = async (ID: string, update: Partial<User>) => {
  return functionWrapper(async () => {
    await usersCollection.updateOne({ ID }, { $set: update });
  });
};

export const addAuthMethod = async (userID: string, authMethod: User['authenticationMethods'][0]) => {
  return functionWrapper(async () => {
    await usersCollection.updateOne({ ID: userID }, { $push: { authenticationMethods: authMethod } });
  });
};

export const savePincode = async (email: string, pincode: string) => {
  return functionWrapper(async () => {
    await pincodesCollection.updateOne(
      { email },
      { $set: { pincode, createdAt: new Date() } },
      { upsert: true },
    );
  });
};

export const verifyPincode = async (email: string, pincode: string) => {
  return functionWrapper(async () => {
    const record = await pincodesCollection.findOne({ email, pincode });
    if (!record) {
      return false;
    }
    // Optionally, check if pincode is expired
    return true;
  });
};
