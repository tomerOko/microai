// dal.ts
import { AppError, functionWrapper } from 'common-lib-tomeroko3';
import { ObjectId } from 'mongodb';

import { usersCollection } from '../configs/mongoDB/initialization';
import { User } from '../configs/mongoDB/initialization';

import { appErrorCodes } from './appErrorCodes';

/**
 * Creates a new user in the users collection.
 */
export const createUser = async (user: User) => {
  return functionWrapper(async () => {
    await usersCollection.insertOne(user);
  });
};

/**
 * Retrieves a user by their userID.
 */
export const getUserByID = async (userID: string) => {
  return functionWrapper(async () => {
    const user = await usersCollection.findOne({ userID });
    return user;
  });
};

/**
 * Updates a user's information by their userID.
 */
export const updateUserByID = async (userID: string, update: Partial<User>): Promise<User> => {
  return functionWrapper(async () => {
    const updatedUser = await usersCollection.findOneAndUpdate({ _id: new ObjectId(userID) }, { $set: update });
    if (!updatedUser) {
      throw new AppError(appErrorCodes.UPDATE_USER_USER_NOT_FOUND, { userID });
    }
    return updatedUser;
  });
};
