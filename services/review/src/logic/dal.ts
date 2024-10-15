// dal.ts
import { functionWrapper } from 'common-lib-tomeroko3';

import {
  Review,
  ConsultantRating,
  TopicRating,
  ReviewReminder,
  reviewsCollection,
  consultantRatingsCollection,
  topicRatingsCollection,
  reviewRemindersCollection,
  usersCollection,
} from '../configs/mongoDB/initialization';

export const createReview = async (review: Review) => {
  return functionWrapper(async () => {
    await reviewsCollection.insertOne(review);
  });
};

export const updateConsultantRating = async (consultantID: string): Promise<number> => {
  return functionWrapper(async () => {
    const reviews = await reviewsCollection.find({ consultantID }).toArray();
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    await consultantRatingsCollection.updateOne(
      { consultantID },
      { $set: { rating: averageRating } },
      { upsert: true },
    );
    return averageRating;
  });
};

export const updateTopicRating = async (topicID: string): Promise<number> => {
  return functionWrapper(async () => {
    const reviews = await reviewsCollection.find({ topicID }).toArray();
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    await topicRatingsCollection.updateOne(
      { topicID },
      { $set: { rating: averageRating } },
      { upsert: true },
    );
    return averageRating;
  });
};

export const getReviewsByConsultantIDWithPagination = async (
  consultantID: string,
  pagination: { page: number; limit: number },
): Promise<{ reviews: Review[]; totalReviews: number }> => {
  return functionWrapper(async () => {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;
    const totalReviews = await reviewsCollection.countDocuments({ consultantID });
    const reviews = await reviewsCollection
      .find({ consultantID })
      .skip(skip)
      .limit(limit)
      .toArray();
    return { reviews, totalReviews };
  });
};

export const getReviewsByTopicIDWithPagination = async (
  topicID: string,
  pagination: { page: number; limit: number },
): Promise<{ reviews: Review[]; totalReviews: number }> => {
  return functionWrapper(async () => {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;
    const totalReviews = await reviewsCollection.countDocuments({ topicID });
    const reviews = await reviewsCollection
      .find({ topicID })
      .skip(skip)
      .limit(limit)
      .toArray();
    return { reviews, totalReviews };
  });
};

export const getConsultantRating = async (consultantID: string): Promise<number> => {
  return functionWrapper(async () => {
    const ratingDoc = await consultantRatingsCollection.findOne({ consultantID });
    return ratingDoc ? ratingDoc.rating : 0;
  });
};

export const getTopicRating = async (topicID: string): Promise<number> => {
  return functionWrapper(async () => {
    const ratingDoc = await topicRatingsCollection.findOne({ topicID });
    return ratingDoc ? ratingDoc.rating : 0;
  });
};

export const createReviewReminder = async (reminder: ReviewReminder) => {
  return functionWrapper(async () => {
    await reviewRemindersCollection.insertOne(reminder);
  });
};
