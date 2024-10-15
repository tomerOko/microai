// configs/mongoDB/initialization.ts
import { CollectionInitializerProps, SafeCollection, collectionInitializer, functionWrapper } from 'common-lib-tomeroko3';
import { ratingDbValidations } from 'events-tomeroko3';
import { z } from 'zod';

const { review, consultantRating, topicRating, reviewReminder, user } = ratingDbValidations;

export type Review = z.infer<typeof review>;
export type ConsultantRating = z.infer<typeof consultantRating>;
export type TopicRating = z.infer<typeof topicRating>;
export type ReviewReminder = z.infer<typeof reviewReminder>;
export type User = z.infer<typeof user>;

const reviewsInitializerProps: CollectionInitializerProps<Review> = {
  collectionName: 'reviews',
  documentSchema: review,
  indexSpecs: [
    { key: { consultantID: 1 } },
    { key: { topicID: 1 } },
    { key: { callID: 1 }, unique: true },
  ],
};

const consultantRatingsInitializerProps: CollectionInitializerProps<ConsultantRating> = {
  collectionName: 'consultantRatings',
  documentSchema: consultantRating,
  indexSpecs: [{ key: { consultantID: 1 }, unique: true }],
};

const topicRatingsInitializerProps: CollectionInitializerProps<TopicRating> = {
  collectionName: 'topicRatings',
  documentSchema: topicRating,
  indexSpecs: [{ key: { topicID: 1 }, unique: true }],
};

const reviewRemindersInitializerProps: CollectionInitializerProps<ReviewReminder> = {
  collectionName: 'reviewReminders',
  documentSchema: reviewReminder,
  indexSpecs: [{ key: { reminderDate: 1 } }],
};

const usersInitializerProps: CollectionInitializerProps<User> = {
  collectionName: 'users',
  documentSchema: user,
  indexSpecs: [{ key: { ID: 1 }, unique: true }],
};

export let reviewsCollection: SafeCollection<Review>;
export let consultantRatingsCollection: SafeCollection<ConsultantRating>;
export let topicRatingsCollection: SafeCollection<TopicRating>;
export let reviewRemindersCollection: SafeCollection<ReviewReminder>;
export let usersCollection: SafeCollection<User>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    reviewsCollection = await collectionInitializer(reviewsInitializerProps);
    consultantRatingsCollection = await collectionInitializer(consultantRatingsInitializerProps);
    topicRatingsCollection = await collectionInitializer(topicRatingsInitializerProps);
    reviewRemindersCollection = await collectionInitializer(reviewRemindersInitializerProps);
    usersCollection = await collectionInitializer(usersInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await reviewsCollection.deleteMany({});
    await consultantRatingsCollection.deleteMany({});
    await topicRatingsCollection.deleteMany({});
    await reviewRemindersCollection.deleteMany({});
    await usersCollection.deleteMany({});
  });
};
