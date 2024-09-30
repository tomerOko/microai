// configs/mongoDB/initialization.ts
import {
  CollectionInitializerProps,
  SafeCollection,
  collectionInitializer,
  functionWrapper,
} from 'common-lib-tomeroko3';
import { notificationsDbValidations } from 'events-tomeroko3';
import { z } from 'zod';

const { notification } = notificationsDbValidations;

export type Notification = z.infer<typeof notification>;

const notificationsInitializerProps: CollectionInitializerProps<Notification> = {
  collectionName: 'notifications',
  documentSchema: notification,
  indexSpecs: [{ key: { userID: 1, createdAt: -1 } }],
};

export let notificationsCollection: SafeCollection<Notification>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    notificationsCollection = await collectionInitializer(notificationsInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await notificationsCollection.deleteMany({});
  });
};
