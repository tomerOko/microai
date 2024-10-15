// service.ts
import { AppError, functionWrapper, getAuthenticatedID } from 'common-lib-tomeroko3';
import {
  becomeConsultantRequestType,
  becomeConsultantResponseType,
  updateConsultantProfileRequestType,
  updateConsultantProfileResponseType,
  addTopicRequestType,
  addTopicResponseType,
  updateTopicRequestType,
  updateTopicResponseType,
  removeTopicRequestType,
  removeTopicResponseType,
} from 'events-tomeroko3';

import {
  consultantOnboardedPublisher,
  consultantProfileUpdatedPublisher,
  topicAddedPublisher,
  topicUpdatedPublisher,
  topicRemovedPublisher,
} from '../configs/rabbitMQ/initialization';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';

export const becomeConsultant = async (
  props: becomeConsultantRequestType['body'],
): Promise<becomeConsultantResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const user = await model.getUserByID(userID);
    if (!user) {
      throw new AppError(appErrorCodes.USER_NOT_FOUND, { userID });
    }
    const { email, firstName, lastName } = user;
    const consultantProps = { email, firstName, lastName, userID, ...props, isActive: true };
    const ID = await model.createConsultant(consultantProps);
    consultantOnboardedPublisher({ ...consultantProps, ID });
    return { consultantID: ID };
  });
};

export const updateConsultantProfile = async (
  props: updateConsultantProfileRequestType['body'],
): Promise<updateConsultantProfileResponseType> => {
  return functionWrapper(async () => {
    const { consultantID, consultant: update } = props;
    const userID = getAuthenticatedID() as string;
    const consultant = await model.getConsultantByID(consultantID);
    if (!consultant) {
      throw new AppError(appErrorCodes.CONSULTANT_NOT_FOUND, { consultantID });
    }
    if (consultant.userID !== userID) {
      throw new AppError(appErrorCodes.WRONG_USER_ID, { consultantID, userID });
    }
    await model.updateConsultantByID(consultantID, update);
    consultantProfileUpdatedPublisher({ ...consultant, ...update });
    return {};
  });
};

export const addTopic = async (props: addTopicRequestType['body']): Promise<addTopicResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const consultant = await model.getConsultantByUserID(userID);
    if (!consultant) {
      throw new AppError(appErrorCodes.CONSULTANT_NOT_FOUND, { userID });
    }
    const topicProps = { ...props, consultantID: consultant.ID, isActive: true, userID };
    const ID = await model.createTopic(topicProps);
    topicAddedPublisher({ ...topicProps, ID });
    return { topicID: ID };
  });
};

export const updateTopic = async (
  props: updateTopicRequestType['body'],
): Promise<updateTopicResponseType> => {
  return functionWrapper(async () => {
    const { topicID, topic: update } = props;
    const userID = getAuthenticatedID() as string;
    const topic = await model.getTopicByID(topicID);
    if (!topic) {
      throw new AppError(appErrorCodes.TOPIC_NOT_FOUND, { topicID });
    }
    if (topic.userID !== userID) {
      throw new AppError(appErrorCodes.WRONG_USER_ID, { topicID, userID });
    }
    await model.updateTopicByID(topicID, update);
    topicUpdatedPublisher({ ...topic, ...update });
    return {};
  });
};

export const removeTopic = async (
  props: removeTopicRequestType['body'],
): Promise<removeTopicResponseType> => {
  return functionWrapper(async () => {
    const { topicID } = props;
    const userID = getAuthenticatedID() as string;
    const topic = await model.getTopicByID(topicID);
    if (!topic) {
      throw new AppError(appErrorCodes.TOPIC_NOT_FOUND, { topicID });
    }
    if (topic.userID !== userID) {
      throw new AppError(appErrorCodes.WRONG_USER_ID, { topicID, userID });
    }
    await model.deleteTopicByID(topicID);
    topicRemovedPublisher({ topicID });
    return {};
  });
};
