import { AppError, OptionalID, functionWrapper } from 'common-lib-tomeroko3';
import { ObjectId, UpdateResult } from 'mongodb';

import { app } from '../app';
import { Pincode, User, pincodesCollection, usersCollection } from '../configs/mongoDB/initialization';

import { appErrorCodes } from './appErrorCodes';

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
    await pincodesCollection.updateOne({
      filter: { email },
      update: pincodeEntry,
      options: { upsert: true },
    });
  });
};

export const findPincode = async (email: string) => {
  return functionWrapper(async () => {
    const pincodeEntry = await pincodesCollection.findOne({
      email,
    });
    return pincodeEntry;
  });
};

export const deletePincode = async (email: string) => {
  return functionWrapper(async () => {
    await pincodesCollection.deleteOne({
      email,
    });
  });
};

export const createUser = async (user: OptionalID<User>) => {
  return functionWrapper(async () => {
    const result = await usersCollection.insertOne(user);
    return result;
  });
};

export const getUserByID = async (ID: string) => {
  return functionWrapper(async () => {
    const user = await usersCollection.findOne({ ID });
    return user;
  });
};

export const updateUserByID = async (userID: string, update: Partial<User>): Promise<UpdateResult | null> => {
  return functionWrapper(async () => {
    const updatedUser = await usersCollection.updateOne({
      filter: { ID: userID },
      update,
      options: { upsert: false },
    });
    return updatedUser;
  });
};
