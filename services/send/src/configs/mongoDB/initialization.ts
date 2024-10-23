// MongoDB Initialization (initialization.ts)
import { CollectionInitializerProps, SafeCollection, collectionInitializer, functionWrapper } from 'common-lib-tomeroko3';
import { sendDbValidations } from 'events-tomeroko3';
import { z } from 'zod';

const { user, message, deliveryStatus } = sendDbValidations;

export type User = z.infer<typeof user>;
export type Message = z.infer<typeof message>;
export type DeliveryStatus = z.infer<typeof deliveryStatus>;

const usersInitializerProps: CollectionInitializerProps<User> = {
  collectionName: 'users',
  documentSchema: user,
  indexSpecs: [{ key: { userID: 1 }, unique: true }],
};

const messagesInitializerProps: CollectionInitializerProps<Message> = {
  collectionName: 'messages',
  documentSchema: message,
  indexSpecs: [{ key: { messageID: 1 }, unique: true }],
};

const deliveryStatusInitializerProps: CollectionInitializerProps<DeliveryStatus> = {
  collectionName: 'deliveryStatus',
  documentSchema: deliveryStatus,
  indexSpecs: [{ key: { deliveryID: 1 }, unique: true }],
};

export let usersCollection: SafeCollection<User>;
export let messagesCollection: SafeCollection<Message>;
export let deliveryStatusCollection: SafeCollection<DeliveryStatus>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    usersCollection = await collectionInitializer(usersInitializerProps);
    messagesCollection = await collectionInitializer(messagesInitializerProps);
    deliveryStatusCollection = await collectionInitializer(deliveryStatusInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await usersCollection.deleteMany({});
    await messagesCollection.deleteMany({});
    await deliveryStatusCollection.deleteMany({});
  });
};
