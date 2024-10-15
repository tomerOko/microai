// dal.ts
import { OptionalID, functionWrapper } from 'common-lib-tomeroko3';

import {
  AvailabilityBlock,
  availabilityBlocksCollection,
  ConsultantAvailability,
  consultantAvailabilitiesCollection,
} from '../configs/mongoDB/initialization';

export const createAvailabilityBlock = async (block: OptionalID<AvailabilityBlock>) => {
  return functionWrapper(async () => {
    const ID = await availabilityBlocksCollection.insertOne(block);
    return ID;
  });
};

export const getAvailabilityBlockByID = async (ID: string) => {
  return functionWrapper(async () => {
    const block = await availabilityBlocksCollection.findOne({ ID });
    return block;
  });
};

export const updateAvailabilityBlockByID = async (ID: string, update: Partial<AvailabilityBlock>) => {
  return functionWrapper(async () => {
    await availabilityBlocksCollection.updateOne({ ID }, { $set: update });
  });
};

export const createConsultantAvailability = async (
  availability: OptionalID<ConsultantAvailability>,
) => {
  return functionWrapper(async () => {
    const ID = await consultantAvailabilitiesCollection.insertOne(availability);
    return ID;
  });
};

export const getConsultantAvailabilityByConsultantID = async (consultantID: string) => {
  return functionWrapper(async () => {
    const availability = await consultantAvailabilitiesCollection.findOne({ consultantID });
    return availability;
  });
};

export const updateConsultantAvailabilityByID = async (
  ID: string,
  update: Partial<ConsultantAvailability>,
) => {
  return functionWrapper(async () => {
    await consultantAvailabilitiesCollection.updateOne({ ID }, { $set: update });
  });
};
