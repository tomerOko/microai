// service.ts
import { AppError, functionWrapper, getAuthenticatedID } from 'common-lib-tomeroko3';
import {
  submitReviewRequestType,
  submitReviewResponseType,
  submitLongTermReviewRequestType,
  submitLongTermReviewResponseType,
  getConsultantReviewsRequestType,
  getConsultantReviewsResponseType,
  getTopicReviewsRequestType,
  getTopicReviewsResponseType,
} from 'events-tomeroko3';

import {
  reviewSubmittedPublisher,
  longTermReviewSubmittedPublisher,
  ratingUpdatedPublisher,
} from '../configs/rabbitMQ/initialization';

import { appErrorCodes } from './appErrorCodes';
import * as model from './dal';

export const submitReview = async (props: submitReviewRequestType['body']): Promise<submitReviewResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const { consultantID, topicID, rating, feedback, callID } = props;

    const review = {
      userID,
      consultantID,
      topicID,
      rating,
      feedback,
      callID,
      type: 'immediate',
      date: new Date(),
    };

    await model.createReview(review);

    // Update consultant's average rating
    const newConsultantRating = await model.updateConsultantRating(consultantID);
    // Update topic's average rating
    const newTopicRating = await model.updateTopicRating(topicID);

    // Publish events
    reviewSubmittedPublisher(review);
    ratingUpdatedPublisher({ consultantID, topicID, consultantRating: newConsultantRating, topicRating: newTopicRating });

    return { message: 'Review submitted successfully' };
  });
};

export const submitLongTermReview = async (
  props: submitLongTermReviewRequestType['body'],
): Promise<submitLongTermReviewResponseType> => {
  return functionWrapper(async () => {
    const userID = getAuthenticatedID() as string;
    const { consultantID, topicID, rating, feedback, callID } = props;

    const review = {
      userID,
      consultantID,
      topicID,
      rating,
      feedback,
      callID,
      type: 'long-term',
      date: new Date(),
    };

    await model.createReview(review);

    // Update consultant's average rating
    const newConsultantRating = await model.updateConsultantRating(consultantID);
    // Update topic's average rating
    const newTopicRating = await model.updateTopicRating(topicID);

    // Publish events
    longTermReviewSubmittedPublisher(review);
    ratingUpdatedPublisher({ consultantID, topicID, consultantRating: newConsultantRating, topicRating: newTopicRating });

    return { message: 'Long-term review submitted successfully' };
  });
};

export const getConsultantReviews = async (
  props: getConsultantReviewsRequestType['query'],
): Promise<getConsultantReviewsResponseType> => {
  return functionWrapper(async () => {
    const { consultantID, page = '1', limit = '10' } = props;
    const pagination = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };
    const { reviews, totalReviews } = await model.getReviewsByConsultantIDWithPagination(consultantID, pagination);
    const rating = await model.getConsultantRating(consultantID);
    return { reviews, rating, totalReviews };
  });
};

export const getTopicReviews = async (
  props: getTopicReviewsRequestType['query'],
): Promise<getTopicReviewsResponseType> => {
  return functionWrapper(async () => {
    const { topicID, page = '1', limit = '10' } = props;
    const pagination = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };
    const { reviews, totalReviews } = await model.getReviewsByTopicIDWithPagination(topicID, pagination);
    const rating = await model.getTopicRating(topicID);
    return { reviews, rating, totalReviews };
  });
};

export const scheduleLongTermReviewReminder = async (props: {
  callID: string;
  studentID: string;
  consultantID: string;
}) => {
  return functionWrapper(async () => {
    const { callID, studentID, consultantID } = props;
    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + 14); // Set reminder for 2 weeks later

    const reminder = {
      callID,
      studentID,
      consultantID,
      reminderDate,
    };

    await model.createReviewReminder(reminder);
  });
};
