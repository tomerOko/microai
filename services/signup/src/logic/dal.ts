// dal.ts
import { OptionalID, functionWrapper } from 'common-lib-tomeroko3';
import { ObjectId } from 'mongodb';

import { User, PincodeEntry, usersCollection, pincodesCollection } from '../configs/mongoDB/initialization';

export const savePincode = async (email: string, pincode: string) => {
  return functionWrapper(async () => {
    const pincodeEntry: PincodeEntry = { email, pincode, createdAt: new Date() };
    await pincodesCollection.insertOne(pincodeEntry);
  });
};

export const validatePincode = async (email: string, pincode: string) => {
  return functionWrapper(async () => {
    const pincodeEntry = await pincodesCollection.findOne({ email, pincode });
    if (!pincodeEntry) {
      return false;
    }
    // Optionally, check for expiration
    // Delete the pincode after validation
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
