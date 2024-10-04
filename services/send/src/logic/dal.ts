// dal.ts
import { functionWrapper } from 'common-lib-tomeroko3';
import { usersCollection } from '../configs/mongoDB/initialization';
import { User } from '../configs/mongoDB/initialization';

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
export const updateUserByID = async (userID: string, update: Partial<User>) => {
  return functionWrapper(async () => {
    await usersCollection.updateOne({ userID }, { $set: update });
  });
};
