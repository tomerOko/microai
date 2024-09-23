// configs/mongoDB/initialization.ts
import {
  CollectionInitializerProps,
  SafeCollection,
  collectionInitializer,
  functionWrapper,
} from 'common-lib-tomeroko3';
import { chatsDbValidations } from 'events-tomeroko3';
import { z } from 'zod';

const { chatRoom } = chatsDbValidations;

export type ChatRoom = z.infer<typeof chatRoom>;

const chatRoomsInitializerProps: CollectionInitializerProps<ChatRoom> = {
  collectionName: 'chatRooms',
  documentSchema: chatRoom,
  indexSpecs: [{ key: { bookingID: 1 }, unique: true }],
};

export let chatRoomsCollection: SafeCollection<ChatRoom>;

export const initializeCollections = async () => {
  return functionWrapper(async () => {
    chatRoomsCollection = await collectionInitializer(chatRoomsInitializerProps);
  });
};

export const cleanCollections = async () => {
  return functionWrapper(async () => {
    await chatRoomsCollection.deleteMany({});
  });
};
