// dal.ts
import { OptionalID, functionWrapper } from 'common-lib-tomeroko3';

import {
  Consultant,
  Topic,
  User,
  consultantsCollection,
  topicsCollection,
  usersCollection,
} from '../configs/mongoDB/initialization';

export const createConsultant = async (consultant: OptionalID<Consultant>) => {
  return functionWrapper(async () => {
    const ID = await consultantsCollection.insertOne(consultant);
    return ID;
  });
};

export const getConsultantByID = async (ID: string) => {
  return functionWrapper(async () => {
    const consultant = await consultantsCollection.findOne({ ID });
    return consultant;
  });
};

export const getConsultantByUserID = async (userID: string) => {
  return functionWrapper(async () => {
    const consultant = await consultantsCollection.findOne({ userID });
    return consultant;
  });
};

export const updateConsultantByID = async (ID: string, update: Partial<Consultant>) => {
  return functionWrapper(async () => {
    await consultantsCollection.updateOne({ ID }, { $set: update });
  });
};

export const createTopic = async (topic: OptionalID<Topic>) => {
  return functionWrapper(async () => {
    const ID = await topicsCollection.insertOne(topic);
    return ID;
  });
};

export const getTopicByID = async (ID: string) => {
  return functionWrapper(async () => {
    const topic = await topicsCollection.findOne({ ID });
    return topic;
  });
};

export const updateTopicByID = async (ID: string, update: Partial<Topic>) => {
  return functionWrapper(async () => {
    await topicsCollection.updateOne({ ID }, { $set: update });
  });
};

export const deleteTopicByID = async (ID: string) => {
  return functionWrapper(async () => {
    await topicsCollection.deleteOne({ ID });
  });
};
