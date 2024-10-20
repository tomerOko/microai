// dal.ts
import { OptionalID, functionWrapper } from 'common-lib-tomeroko3';
import { ObjectId } from 'mongodb';

import { Pincode, User, pincodesCollection, usersCollection } from '../configs/mongoDB/initialization';

export const getUserByEmail = async (email: string) => {
  return functionWrapper(async () => {
    const user = await usersCollection.findOne({
      email,
    });
    return user;
  });
};

export const savePincode = async (email: string, pincode: string) => {
  return functionWrapper(async () => {
    const pincodeEntry: Pincode = { email, pincode, createdAt: new Date() };
    await pincodesCollection.insertOne(pincodeEntry);
  });
};

export const validatePincode = async (email: string, pincode: string) => {
  return functionWrapper(async () => {
    const pincodeEntry = await pincodesCollection.findOne({ email, pincode });
    if (!pincodeEntry) {
      return false;
    }
    const now = new Date();
    const diff = now.getTime() - pincodeEntry.createdAt.getTime();
    // todo: move the 10 * 60 * 1000 to a system variable
    if (diff > 10 * 60 * 1000) {
      return false;
    }
    await pincodesCollection.deleteOne({ _id: pincodeEntry._id });
    return true;
  });
};

export const createUser = async (user: OptionalID<User>) => {
  return functionWrapper(async () => {
    const result = await usersCollection.insertOne(user);
    return result.insertedId.toHexString();
  });
};

export const getUserByID = async (userID: string) => {
  return functionWrapper(async () => {
    const user = await usersCollection.findOne({ _id: new ObjectId(userID) });
    return user;
  });
};

export const updateUserByID = async (userID: string, update: Partial<User>) => {
  return functionWrapper(async () => {
    await usersCollection.updateOne({ _id: new ObjectId(userID) }, { $set: update });
  });
};

export const addAuthMethod = async (userID: string, method: string) => {
  return functionWrapper(async () => {
    await usersCollection.updateOne({ _id: new ObjectId(userID) }, { $addToSet: { authMethods: method } });
  });
};
