// configs/mongoDB/initialization.ts

import {
  CollectionInitializerProps,
  SafeCollection,
  collectionInitializer,
  functionWrapper,
} from 'common-lib';
import { notificationsDbValidations } from '../../shared/validations/notifications';
import { z } from 'zod';

const { userPreferences, scheduledNotification, notification } = notificationsDbValidations;

export type UserPreferences = z.infer<typeof userPreferences>;
export type ScheduledNotification = z.infer<typeof scheduledNotification>;
export type Notification = z.infer<typeof notification>;

const userPreferencesInitializerProps: CollectionInitializerProps<UserPreferences> = {
  collectionName: 'userPreferences',
  documentSchema: userPreferences,
  indexSpecs: [{ key: { userID: 1 }, unique: true }],
};

const scheduledNotificationsInitializerProps: CollectionInitializerProps<ScheduledNotification> = {
  collectionName: 'scheduledNotifications',
  documentSchema: scheduledNotification,
  indexSpecs: [{ key: { sendTime: 1 }, unique: false }],
};

const notificationsInitializerProps: CollectionInitializerProps<Notification> = {
  collectionName: 'notifications',
  documentSchema: notification,
  indexSpecs: [{ key: { userID: 1 }, unique: false }],
};

export let userPreferencesCollection: SafeCollection<UserPreferences>;
export let scheduledNotificationsCollection: SafeCollection<ScheduledNotification>;
export let notificationsCollection: SafeCollection<Notification>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    userPreferencesCollection = await collectionInitializer(userPreferencesInitializerProps);
    scheduledNotificationsCollection = await collectionInitializer(scheduledNotificationsInitializerProps);
    notificationsCollection = await collectionInitializer(notificationsInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await userPreferencesCollection.deleteMany({});
    await scheduledNotificationsCollection.deleteMany({});
    await notificationsCollection.deleteMany({});
  });
};
