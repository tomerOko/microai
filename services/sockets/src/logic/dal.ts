// dal.ts
import { functionWrapper } from 'common-lib-tomeroko3';

import { User, usersCollection } from '../configs/mongoDB/initialization';

export const createUser = async (user: User) => {
  return functionWrapper(async () => {
    await usersCollection.insertOne(user);
  });
};

export const updateUserStatus = async (userID: string, status: 'online' | 'offline') => {
  return functionWrapper(async () => {
    await usersCollection.updateOne({ ID: userID }, { $set: { status } });
  });
};

export const getUserByID = async (ID: string) => {
  return functionWrapper(async () => {
    const user = await usersCollection.findOne({ ID });
    return user;
  });
};

export const getOnlineUsers = async () => {
  return functionWrapper(async () => {
    const users = await usersCollection.find({ status: 'online' }).toArray();
    return users;
  });
};
